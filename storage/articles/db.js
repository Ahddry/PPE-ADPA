let db = {
    articles: [
        {
            id: 1,
            titre: "Ecoute prolongée d'un média peut causer des problèmes de santé",
            date: "2023/03/15",
            tags: ["Article", "Santé", "Information", "Média", "Ecoute"],
            auteurs: "ADPA",
            illustration: "https://www.normandie.ars.sante.fr/system/files/2023-03/site-audition.jpg",
            contenu: [
                {
                    titre: "Introduction",
                    section:
                        "Avec l'augmentation de l'utilisation des appareils audio portables tels que les écouteurs et les haut-parleurs Bluetooth, il est de plus en plus courant de voir des gens passer de longues heures à écouter de la musique, des podcasts et d'autres médias audio à des niveaux sonores élevés. Cependant, cette pratique peut avoir des conséquences néfastes pour l'audition. Dans cet article, nous allons explorer les risques associés à une écoute prolongée et à trop haut volume sonore d'un média audio et les mesures que vous pouvez prendre pour protéger votre audition.",
                },
                {
                    titre: "Sensibilité de l'oreille humaine",
                    section:
                        "La première chose à comprendre est que l'audition est un sens très sensible et délicat. Des niveaux sonores élevés peuvent endommager les cellules ciliées de l'oreille interne, qui sont responsables de la transmission des signaux sonores au cerveau. Si ces cellules sont endommagées, elles ne peuvent pas se régénérer, ce qui peut entraîner une perte auditive permanente.",
                },
                {
                    titre: "Le temps à prendre en facteur",
                    section:
                        "Les niveaux sonores sont mesurés en décibels (dB). L'Organisation mondiale de la santé (OMS) recommande de ne pas être exposé à des niveaux sonores supérieurs à 85 dB pendant plus de huit heures par jour. Pour vous donner une idée, une conversation normale a un niveau sonore d'environ 60 dB, alors que la musique à un concert peut atteindre 110 dB ou plus.",
                },
                {
                    titre: "Les risques de l'écoute prolongée",
                    section:
                        "Il est important de comprendre que l'écoute prolongée et à trop haut volume sonore d'un média audio peut être particulièrement nocive. Si vous écoutez de la musique à un volume élevé pendant plusieurs heures d'affilée, vous risquez de causer des dommages permanents à vos cellules ciliées et de développer une perte auditive progressive au fil du temps.",
                },
                {
                    titre: "Les signes à surveiller",
                    section:
                        "Il existe des signes à surveiller pour savoir si vous vous exposez à des niveaux sonores dangereux. Si vous avez des acouphènes (un bourdonnement ou un sifflement dans les oreilles), si vous avez besoin de monter le volume pour entendre clairement ou si vous avez des difficultés à entendre les voix dans un environnement bruyant, cela peut indiquer que vous avez déjà subi des dommages à votre audition.",
                },
                {
                    titre: "Mesures de prévention",
                    section: "Heureusement, il y a des mesures que vous pouvez prendre pour protéger votre audition lorsque vous écoutez de la musique ou d'autres médias audio. Voici quelques conseils utiles :",
                },
                {
                    section:
                        "1. Utilisez des écouteurs ou des casques de qualité: Les écouteurs et les casques de qualité sont conçus pour réduire les bruits environnants et vous permettre d'écouter à des niveaux sonores plus bas tout en profitant d'une expérience d'écoute de qualité.",
                },
                {
                    section: "2. Limitez la durée d'écoute: Essayez de limiter la durée d'écoute à moins de 60 minutes par jour, surtout si vous écoutez à des niveaux sonores élevés.",
                },
                {
                    section: '3. Réduisez le volume: Évitez d\'écouter à des niveaux sonores élevés et utilisez des applications qui limitent le volume maximal, comme le "limiteur de volume" sur votre appareil mobile.',
                },
                {
                    section: "4. Faites des pauses: Si vous écoutez pendant une longue période, prenez des pauses régulières pour permettre à vos oreilles de se reposer.",
                },
                {
                    titre: "Conclusion",
                    section:
                        "En conclusion, l'écoute prolongée et à trop haut volume sonore d'un média audio peut entraîner des dommages permanents à votre audition. Il est important de prendre des mesures préventives telles que l'utilisation de casques de qualité, la réduction du volume et la limitation de la durée d'écoute. En adoptant ces bonnes pratiques, vous pouvez profiter de vos médias audio préférés tout en protégeant votre audition. N'oubliez pas que votre santé auditive est précieuse et qu'il est essentiel de la préserver pour votre bien-être à long terme.",
                },
                {
                    titre: " ",
                    section: "Illustration : ARS Normandie - Santé.fr",
                },
            ],
        },
        {
            id: 2,
            titre: "Interview du Dr. Samen Haidar, spécialiste otorhinolaryngologiste",
            date: "2023/01/19",
            tags: ["Interview", "Santé", "Information"],
            auteurs: "Hugo Haidar",
            illustration: "http://idata.over-blog.com/0/43/34/69/schema-d-une-oreille.jpg",
            contenu: [
                {
                    titre: "Présentation",
                    section: "Je suis le Dr Samen Haidar et je suis médecin spécialiste otorhinolaryngologiste. Je travaille dans mon cabinet à Paris, mais je suis aussi attaché à des services ORL dans des hôpitaux. ",
                },
                {
                    titre: "Comment fonctionne l’oreille ?",
                    section:
                        "L’oreille est composée de trois parties l’oreille externe qui comprends le papillon et le conduit auditif externe. L’oreille moyenne qui comprend les tympans et la chaîne des osselets. L’oreille interne qui comprend la cochlée organe de l’audition et la partie vestibulaire, l’organe de l’équilibre. ",
                },
                {
                    section:
                        "Les sons sont dirigés et amplifiés grâce à l’oreille externe vers le tympan. Le rôle de l’oreille moyenne est de transformer les ondes sonores mécaniques qui tape contre le tympan en vibration de pression dans les compartiments liquides de l’oreille interne. Cette vibration de pression agit sur les cellules cillées externe qui vont générer via un processus chimique des impulsions électriques qui sont ensuite acheminées au cerveau via le nerf auditif.  ",
                },
                {
                    section: "Les sons forts peuvent générer des liaisons définitives de l’oreille interne de deux types : ",
                },
                {
                    section: "Mécanique : détachement des cils de la membrane tectoriale, lésions ciliaires ou rupture membranaire",
                },
                {
                    section: "Métaboliques : flux ionique de K+ ou Ca^(2+), ischémie",
                },
                {
                    titre: "Quels sont les concéquences possibles ?",
                    section: "La conséquence est la destruction des cellules cochléaires est la rupture des dendrites des cellules nerveuses. ",
                },
                {
                    section: "Les fréquences aigues sont plus nocives que les fréquences graves. La durée d’exposition et l’intensité du son (dB) sont directement proportionnelle à la dégradation de l’audition. ",
                },
                {
                    section: "Ainsi une exposition à 85 décibels pendant 8 heures \n= 88 décibels pendant 4 heures\n= 94 décibels pendant 1 heure\n= 115 décibels pendant 1 min ",
                },
                {
                    titre: "Comment protéger son audition ?",
                    section: "Le seul vrai moyen de combattre la détérioration de l’audition est la prévention. Mais des solution existes pour protéger l’audition comme car exemple des bouchons anti-bruit standard ou sur mesure. ",
                },
                {
                    section: "La durée maximale hebdomadaire d’écoute sans protection est :",
                },
                {
                    section: "-	20h pour un baladeur ou instrument de musique = 90 décibels ",
                },
                {
                    section: "-	2 à 3 heures s’il est aigu à 100 décibels maximum ",
                },
                {
                    section: "-	2h en discothèques à 103 décibels ",
                },
                {
                    section: "En cas de traumatismes sonore aigu récent avec une prête d’audition, un traitement corticoïde est prescrit et il faut donc aller voir un spécialiste rapidement. ",
                },
            ],
        },
        {
            id: 3,
            titre: "Article d'exemple",
            date: "2023/01/29",
            tags: ["Article", "Exemple", "Information"],
            auteurs: "Moi",
            illustration: "https://www.shutterstock.com/image-photo/example-word-written-on-wooden-260nw-1765482248.jpg",
            contenu: [
                {
                    titre: "Premier paragraphe",
                    section:
                        "Have you ever heard the tragedy of Darth Plagueis the Wise? I thought not. It's not a story the Jedi would tell you. It's a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life... He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful... the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. Ironic. He could save others from death, but not himself.",
                },
                {
                    titre: "Deuxième paragraphe",
                    section: "Avec un texte",
                },
                {
                    section: "Un paragraphe sans titre",
                },
                {
                    titre: "Quatrième paragraphe, sans section",
                },
            ],
        },
        {
            id: 4,
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
            id: 5,
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
