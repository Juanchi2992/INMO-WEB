module.exports= (sequelize,dataTypes) => {
    const alias = "Tipos";

    const cols = { 
        id: {
            type: dataTypes.SMALLINT, 
            primaryKey: true, 
            autoIncrement: true
        },
        nombre: dataTypes.STRING
    };

    const config= {
        tableName: "tipos",
        timestamps: false,
    };
    
    const Tipo = sequelize.define(alias, cols, config)

    Tipo.associate = function(models){
        Tipo.belongsToMany(models.Propiedades, {
            as: 'propiedades',
            foreignKey: 'tipo_id',
            timestamps: false
        });
        
    }
    
    return Tipo;
       
}