import bcrypt from 'bcrypt-nodejs';
import dotenv from 'dotenv';
import axios from 'axios';


dotenv.config();


const URL ="http://srv.tgroup.com.ar:3334/webapp";
const KEY="$2a$10$d9IbX8BaND9kDRoI9JKCZu"
const AUTH = `Bearer Mg.og_Wy4tHM9unKseHLu4F0wz4dDcwMsrZc49XXSOFpFDSO-nu7vbB5tYEBA9o` 

const config = {
    headers: { Authorization: `${AUTH}` }
};

export async function logeo (credentials) {
    const empresa = credentials.empresa;
    const username = credentials.username;
    const password = credentials.password;
    try {
      
        let passwordIntocada = password;
        let salt = KEY;
        let respuestaAPI;
        
        let pass = await new Promise((resolve, reject) => {
            bcrypt.hash(password, salt, null, (err, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        });
    
        if (empresa && username) {
            let sqlFilter = `USERNAME = '${username}' AND FK_WS_CLIENTES= '${empresa}'`;

            if (passwordIntocada == "") {
                sqlFilter += ` AND PASSWORD = ''`;
            }
            else{
                sqlFilter += ` AND PASSWORD = '${pass}'`;
            }
            const resp = await axios.get(
                `${URL}/clases/WS_USUARIOS?sqlFilter=${sqlFilter} &&cliente=${empresa}`,
                config, 
                )
            let datos = resp.data;
            if(datos.length == 0)
            {
                respuestaAPI = 201;
            }
            else{
                respuestaAPI = 200;
                if(datos[0].PASSWORD== '' && passwordIntocada == '')
                {	  
                    // Redirect to home page
                }
                else{
                    if(datos[0].PASSWORD == pass){

                        // Redirect to home page
                    }
                    else{
                        respuestaAPI = 401;
                    }
                }
            }
            return ({status: respuestaAPI, datos: datos[0]});
        } 
    } catch (error) {
        console.error(error);
    }
};

export async function enviarClase(endpoint, empresa, datosFormularioActual) {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json', 
                Authorization: `${AUTH}`
            }
        };
        const axiosResponse = await axios.post(`${URL}${endpoint}?cliente=${empresa}`,
            JSON.stringify(datosFormularioActual),
            config
        );
        return ({ status: 200, datos: axiosResponse.data });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        return ({
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data : error.message
        });
    }
}

export async function cambioPassword(password, id, rs) {

    if (id && rs && password) {
        try {
            const salt = KEY;
            let pass = await new Promise((resolve, reject) => {
                bcrypt.hash(password, salt, null, (err, hash) => {
                    if (err) reject(err);
                    resolve(hash);
                });
            });
            const resp = await axios.put(
                `${URL}/usuarios?cliente=${rs}`,
                {
                    "id": id,
                    "password": pass
                },
                config
            );
            return ({ status: 200, datos: resp.data });


        } catch (error) {
            console.error(error);
            return ({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data : error.message
            });        }
    } else {
        return ({
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data : error.message
        });    }

}

export async function traerEndpoint(filtro, parametros, pagina, empresa, endpoint) {
    const sqlFilter = (filtro && parametros) ? `&&sqlFilter=${encodeURIComponent(generateSqlFilter(parametros, filtro))}` : '';
    const resp = await axios.get(
      `${URL}/clases/${endpoint}?cliente=${empresa}${sqlFilter}${pagina ? `&page=${pagina}` : ''}`,
      config
    );
    return ({ status: 200, datos: resp.data });
};


export async function getRegistroUnico(id, endpoint, empresa) {
    if (id && endpoint) {
        try {
            const resp = await axios.get(
                `${URL}${endpoint}?sqlFilter=FK_CNM_VISITAS=${id}&cliente=${empresa}`,
                config
            );
            return ({ status: 200, datos: resp.data });

        } catch (error) {
            console.error(error);
            return ({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data : error.message
            });        }
    } else {
        return ({
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data : error.message
        });    }

}

export async function LbGetClases(empresa) {
    if (empresa) {
        try {
            const resp = await axios.get(
                `${URL}/clases/WS_CLASES?cliente=${empresa}`,
                config
                );
            return ({ status: 200, datos: resp.data });

        } catch (error) {
            console.error(error);
            return ({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data : error.message
            });        }
    } else {
        return ({
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data : error.message
        });    }

}

export async function LbRegistroClase(pagina, parametros, endpoint, empresa) {

    if (pagina) {
        try {
            const parametross = new URLSearchParams(parametros);
			let sqlString = '';
			for (let [key, value] of parametross) {
                sqlString += `${key}='${value}' AND `;
            }
            sqlString = sqlString.slice(0, -5); // remove the last ' AND '
            const resp = await axios.get(
                `${URL}${endpoint}?page=${pagina}&cliente=${empresa}&sqlFilter=${sqlString}`,
                config
            );
            return ({ status: 200, datos: resp.data });

        } catch (error) {
            console.error(error);
            return ({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data : error.message
            });
        }
    } else {
        return ({
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data : error.message
        });
    }
}

function generateSqlFilter(parametros, filtro) {
	// Split the parametros string into an array of parameter names

  
	// Map each parameter name to a SQL-like filter string
	const filters = parametros.map(param => `${param} LIKE '%${filtro}%'`);
  
	// Join the filter strings with ' OR '
	const sqlFilter = filters.join(' OR ');
  
	return sqlFilter;
  }
