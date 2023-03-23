module.exports = (sequelize, dataTypes) => {
    const alias = "Propiedades";
    const cols = { 
        id: {
            type: dataTypes.SMALLINT, 
            primaryKey: true, 
            autoIncrement: true
        },
        nombre: dataTypes.STRING,
	tipos_id: {type: dataTypes.INTEGER, foreignKey: true},
	descripcion: dataTypes.STRING,
        precio: dataTypes.INTEGER,	
	contrato: dataTypes.BINARY,
        disponibilidad_id: {type: dataTypes.INTEGER, foreignKey: true},
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

	Propiedad.belongsTo(models.Disponibilidad, {
            foreignKey: 'disponibilidad_id',
            as: 'disponibilidad'
        })

    }

    return Propiedad;
   
};