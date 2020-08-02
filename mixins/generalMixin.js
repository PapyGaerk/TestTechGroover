export const imgOptions = {
    methods: {
        /**
         * Permet de set l'url de l'image, et si aucun nom n'est spécifié, de renvoyer une image factice.
         * @param {Object}   params
         * @param {String}   params.name - Le nom de l'image
         * @param {String}  [params.path] - Le chemin de l'image, si celui-ci diffère du chemin de base de tmdb
         * @param {Number} [params.imageSize] - L'ID de la taille de l'image
         * @return {String} - Retourne l'url de l'image
         */
        getImgUrl(params) {
            const {
                    name,
                    path = 'https://image.tmdb.org/t/p/',
                    imageSize = 0,
                } = params,
                imageSizes = {
                    0: 'original/',
                    1: 'w300_and_h450_bestv2/'
                };

            let url;

            if (name) {
                url = `${path}${imageSizes[imageSize]}${name}`;
            } else {
                url = require(`@/assets/img/no-img.png`);
            }

            return url;
        }
    }
};