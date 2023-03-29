module.exports = (sequelize, dataTypes) => {
    const alias = "Propiedades";
    const cols = { 
        id: {
            type: dataTypes.SMALLINT, 
            primaryKey: true, 
            autoIncrement: true
        },
        nombre: dataTypes.STRING,
	    tipo_id: {type: dataTypes.INTEGER, foreignKey: true},
	    descripcion: dataTypes.STRING,
        direccion: dataTypes.STRING,
        precio: dataTypes.INTEGER,	
	    contrato_id: dataTypes.INTEGER,
        habitaciones: dataTypes.INTEGER,
	    banos: dataTypes.INTEGER,
	    m2: dataTypes.INTEGER,
    };
    const config= {
        tableName: "propiedades",
        timestamps: false
    };

    const Propiedad = sequelize.define(alias, cols, config);

    Propiedad.associate = function(models){
        Propiedad.hasMany(models.Fotos, {
            foreignKey: 'propiedad_id',
            as: 'foto'
        })

        Propiedad.belongsTo(models.Tipos, {
            foreignKey: 'tipo_id',
            as: 'tipo'
        })

        Propiedad.belongsTo(models.Contratos, {
            foreignKey: 'contrato_id',
            as: 'contrato'
        })

    }

    return Propiedad;
   
};