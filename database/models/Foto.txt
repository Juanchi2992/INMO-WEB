module.exports= (sequelize,dataTypes) => {
    const alias = "Fotos";

    const cols = { 
        id: {
            type: dataTypes.SMALLINT, 
            primaryKey: true, 
            autoIncrement: true
        },
        ruta: dataTypes.STRING, 
        propiedad_id: {
            type: dataTypes.INTEGER, 
            foreignKey: true
        },
    };

    const config= {
        tableName: "fotos",
        timestamps: false,
    };
    
    const Foto = sequelize.define(alias, cols, config)

    Foto.associate = function(models){
        Foto.belongsTo(models.Propiedades, {
            foreignKey: 'propiedad_id',
            as: 'propiedad'
        })
    }
    
    return Foto;

       
}
