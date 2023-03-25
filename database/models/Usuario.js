module.exports= (sequelize,dataTypes) => {
    const alias = "Usuarios";

    const cols = { 
        id: {
            type: dataTypes.SMALLINT, 
            primaryKey: true, 
            autoIncrement: true
        },
        nombre: dataTypes.STRING,
        email: {
            type: dataTypes.STRING,
            unique: true
        },
        password: dataTypes.STRING,
    };

    const config= {
        tableName: "usuarios",
        timestamps: false,
    };

    
    const Usuario = sequelize.define(alias,cols,config)

    return Usuario;
       
}