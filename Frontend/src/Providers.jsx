import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useState } from "react";

const Providers = ({ children }) => {

    const [colorScheme, setColorScheme] = useState('dark');
    const toggleColorScheme = () => {
        setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
    };

    console.log(colorScheme);
    //72b8c9

    return (
        <>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        colorScheme: colorScheme,
                        colors: {
                            // primaryBrand: ['#fffce5', '#fff7b3', '#fff7b3', '#ffed4d', '#ffed4d', '#e6ce00', '#b3a100', '#807300', '#4d4500', '#1a1700'],
                            // primaryBrand2: ['##ffeee6', '#fecdb3', '#feac81', '#fe8b4e', '#fd6a1b', '#e45102', '#b13f01', '#7e2d01', '#4c1b01', '#190900'],
                            // primaryBrand3: ['#6b4b9b', '#d6cbe6', '#bba9d5', '#a087c5', '#8564b4', '#6b4b9b', '#6b4b9b', '#543a78', '#3c2a56', '#241934', '#0c0811'],
                            // secondaryBrand: ['#cdeafe'],
                            // accentBrand: ['#07f86b'],
                            // darkBrand: ['#000'],
                            // lightBrand: ['#fff'],
                            // darkSecondaryBrand: ["#011e32"],
                            // darkAccentBrand: ["#6afba6"],
                            // background: ["#fafafa"],
                            // darkBackground: ["#050505"],
                            // backgroundDark2: ["#000000"],
                            // backgroundLight2: ["#72b8c9"],

                            // // text: ["#2c323f"],
                            // text: ['#000000'],
                            // darkText: ["#ffffff"],
                            // // darkText: ["#6b4b9b"],
                            // // backgroundDark1: ["#000000"],
                            // backgroundDark1: ['#141517'],
                            // backgroundLight1: ["#ffffff"],

                        },
                        // primaryColor: 'primaryBrand3',

                        primaryColor: 'violet',
                        // primaryColor: 'yellow',
                        // primaryShade: 5,

                        //text colors
                        //c1c2c5


                        primaryShade: {
                            light: 8,
                            dark: 4,
                        },

                        shadows: {
                            md: '1px 1px 3px rgba(0, 0, 0, .25)',
                            xl: '5px 5px 3px rgba(0, 0, 0, .25)',
                        },

                        headings: {
                            fontFamily: 'Ubuntu Mono',
                            // fontFamily: 'Special Elite'
                        },

                        fontFamily: 'Ubuntu Mono',
                        // fontFamily: 'Special Elite',
                        globalStyles: (theme) => ({
                            '*, *::before, *::after': {
                                boxSizing: 'border-box',
                            },

                            body: {
                                ...theme.fn.fontStyles(),
                                // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.backgroundDark1 : theme.colors.backgroundLight1,
                                // color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                                color: theme.colorScheme === 'dark' ? theme.colors.darkText : theme.colors.text,
                                lineHeight: theme.lineHeight,
                            },
                            // '#game_words': {
                            //     display: 'inline !important',
                            // },
                            // '#game_words:focus-visible': {
                            //     outline: '0',
                            // },
                            // '.doneWords': {
                            //     display: 'inline',
                            //     fontFamily: 'monospace',
                            //     fontSize: '1.5rem',
                            // },
                            // '.bg-green-200': {
                            //     display: 'inline',
                            //     fontFamily: 'monospace',
                            //     color: theme.colors.correctDoneWords,
                            //     fontSize: '1.5rem',
                            // },
                            // '.bg-red-200': {
                            //     display: 'inline',
                            //     fontFamily: 'monospace',
                            //     color: theme.colors.inCorrectDoneWords,
                            //     fontSize: '1.5rem',
                            // },
                            // '.cursor': {
                            //     display: 'inline',
                            //     fontFamily: 'monospace',
                            //     fontSize: '1.5rem',
                            //     animation: 'cursorBlink 1s infinity',

                            //     '@keyframes cursorBlink': {
                            //         '0%': {
                            //             opacity: '0',
                            //         },
                            //         '50%': {
                            //             opacity: '1',
                            //         },
                            //         '100%': {
                            //             opacity: ' 0',
                            //         },
                            //     }
                            // },
                            // 'pendingWords': {
                            //     display: 'inline',
                            //     fontFamily: 'monospace',
                            //     color: theme.colors.pendingWords,
                            //     fontSize: '1.5rem',
                            // },
                            // '.short': {
                            //     width: '80%',
                            //     margin: 'auto',
                            // },
                            '.link': {
                                textDecoration: 'none',
                                color: theme.colorScheme === 'dark' ? theme.colors.violet[4] : theme.colors.violet[8],
                            },



                        }),
                    }}
                >
                    {children}
                </MantineProvider>
            </ColorSchemeProvider >
        </>

    );
}

export default Providers;