module.exports= (sequelize, dataTypes) => {
    const alias = "Disponibilidad";

    const cols = { 
        id: {
            type: dataTypes.SMALLINT, 
            primaryKey: true, 
            autoIncrement: true
        },
        nombre: dataTypes.STRING,
    };

    const config= {
        tableName: "disponibilidad",
        timestamps: false,
    };
    
    const Disponibilidad = sequelize.define(alias,cols,config)

    Disponibilidad.associate = function(models){    
        Disponibilidad.hasMany(models.Propiedades, {
                foreignKey: 'disponibilidad_id',
                as: 'prop'
            }
        );
    }

    return Disponibilidad;
       
}