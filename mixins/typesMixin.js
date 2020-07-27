import cssVars from '@/assets/scss/_var.scss'

export const types = {
    methods: {
        getTypeStyleBackground(types) {
            let style = {
                border: '10px solid black',
                boxSizing: 'border-box',
                position: 'relative',
                transition: 'all .1s ease-in'
            };

            if (types.length === 1) {
                style.backgroundColor = cssVars[types[0].type.name];
                style.borderColor = cssVars[`darken${types[0].type.name}`];
            } else {
                style.background = `linear-gradient(to left top, ${cssVars[types[1].type.name]} 0%, ${cssVars[types[1].type.name]} 50%, ${cssVars[types[0].type.name]} 50%, ${cssVars[types[0].type.name]} 100%)`;
                style.borderLeftColor = cssVars[`darken${types[0].type.name}`];
                style.borderTopColor = cssVars[`darken${types[0].type.name}`];
                style.borderRightColor = cssVars[`darken${types[1].type.name}`];
                style.borderBottomColor = cssVars[`darken${types[1].type.name}`];
            }

            return style;
        },
        getTypeStyleBorders(color) {
            return {
                border: `2px solid ${cssVars[`darken${color}`]}`,
                background: cssVars[`darken${color}`]
            };
        }
    }
};