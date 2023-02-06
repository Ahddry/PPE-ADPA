let db = {
    users: [
        {
            id: 1,
            username: "admin",
            email: "admin",
            password: "azerty",
            telephone: "0123456789",
            presets: [
                {
                    nom: "Marche",
                    min: 25,
                    max: 75,
                    icone: "walk",
                },
                {
                    nom: "Transport",
                    min: 15,
                    max: 80,
                    icone: "train",
                },
                {
                    nom: "Travail",
                    min: 10,
                    max: 70,
                    icone: "text-box-check",
                },
            ],
        },
        {
            id: 2,
            username: "adri",
            email: "adri.pub92@gmail.com",
            password: "azerty",
            telephone: "0612345678",
            presets: [
                {
                    nom: "Marche",
                    min: 65,
                    max: 100,
                    icone: "walk",
                },
                {
                    nom: "Transport",
                    min: 15,
                    max: 80,
                    icone: "train",
                },
                {
                    nom: "Travail",
                    min: 10,
                    max: 70,
                    icone: "text-box-check",
                },
            ],
        },
    ],
};

export default db;
