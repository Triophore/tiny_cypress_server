module.exports = {
    server : {
        host : "0.0.0.0",
        port : 4500
    },
    mongodb : "mongodb+srv://admin:admin@cluster0.evips.mongodb.net/tiny_cypress?retryWrites=true&w=majority",
    jwt:{
        key : "b7eW7acoYCZNHatFNCJ5eAjlZrxEtCIS8WjDKjiwwpwYuBihqUFGuMGe1QwquAmGTgsejV3hzJorA/8N+e5nMTSZv7/EvW3JGCs7awfxpGjzGmbVPXxDttbyGeICANIGCPGw+9koS8SIq6xmYdihSEfdXjmsuH17fmGSsA1ukZc74/hcSlP5o3wGdLNSXAWdti5y3yat/SVsOZ7dIms3IbGSj64TT4UgAKYSq3/ABp5Gkng3NT1xFfonZDZ1ZqMRnOhS+NEwoyXk4x9c8EdQiD0a/qFJMD5F+xcBYlX7rU+aXIKsQnrhI0XEwOs6Z+VEkkZSVuckMGaYjXJbaA0Q2Q=="
    },
    
    bcrypt:{
        round:10
    },
    ping_interval:5000,
    influx_db_name:"LS",
    influx_db : "http://localhost:8086/",
    influx_db_port: 8086,
    influx_db_user : "admin",
    influx_db_org : "LS",
    influx_db_token : "VJ6CH2uhlfQIgIYBWJE5fAG6I59j2e-QrwnwNgAT-770qNFXi8CpPNpA7hbA-emITGOuFacXhX2sks8XycKnnw==",
    influx_db_bucket : "LS",
}
