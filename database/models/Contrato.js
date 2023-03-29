module.exports= (sequelize,dataTypes) => {
    const alias = "Contratos";

    const cols = { 
        id: {
            type: dataTypes.SMALLINT, 
            primaryKey: true, 
            autoIncrement: true
        },
        nombre: dataTypes.STRING
    };

    const config= {
        tableName: "contratos",
        timestamps: false,
    };
    
    const Contrato = sequelize.define(alias, cols, config)

    Contrato.associate = function(models){
        Contrato.hasMany(models.Propiedades, {
            as: 'propiedades',
            foreignKey: 'contrato_id',
            timestamps: false
        });
        
    }
    
    return Contrato;
       
}