let db = {
    articles: [
        {
            id: 1,
            titre: "L'oreille",
            date: "2022/07/15",
            tags: ["Article", "Santé", "Information"],
            auteurs: "Julien Patrick",
            illustration: "http://idata.over-blog.com/0/43/34/69/schema-d-une-oreille.jpg",
            contenu: [
                {
                    titre: "Introduction",
                    section:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. ",
                },
                {
                    titre: "Développement",
                    section:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed eu",
                },
                {
                    titre: "Conclusion",
                    section:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. ",
                },
            ],
        },
        {
            id: 2,
            titre: "Interview du Dr. Michel",
            date: "2020/03/17",
            tags: ["Interview", "Santé", "Technologie", "Ecoute"],
            auteurs: "Emilie Dupont",
            contenu: [
                {
                    titre: "Introduction",
                    section:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. ",
                },
                {
                    titre: "Développement",
                    section:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed eu",
                },
                {
                    titre: "Conclusion",
                    section:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. ",
                },
            ],
        },
        {
            id: 3,
            titre: "Ecoute prolongée d'un média peut causer des problèmes de santé",
            date: "2023/01/03",
            tags: ["Article", "Santé", "Information", "Média", "Ecoute"],
            auteurs: "Julien Daniel",
            illustration: "https://i.f1g.fr/media/ext/680x/sante.lefigaro.fr/sites/default/files/img/2017/05/15/oreille.jpg",
            contenu: [
                {
                    titre: "Introduction",
                    section:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. ",
                },
                {
                    titre: "Développement",
                    section:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed eu",
                },
                {
                    titre: "Conclusion",
                    section:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, vitae aliquam nisl nisl sit amet nisl. ",
                },
            ],
        },
    ],
};

export default db;
