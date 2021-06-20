import React from 'react'
import { Grid, Avatar, Box, Typography } from "@material-ui/core";
import CountUp from "react-countup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: "transparent",
        width: 'auto',
        height: 'auto',
    },
    feature: {
        color: "black",
        minHeight: "30vh",
        position: "relative",
       marginLeft:'25%'
    },
    col: {
        flexDirection: 'column',
        marginRight: '10%',
        "@media (max-width: 900px)": {
            flexDirection: 'inherit',
          },
    },
    title: {
        marginTop: '5%',
        marginLeft: '1%'
    }
}))

const featureList = [
    {
        icon:  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAKAUlEQVR4nO2cf3AU1R3AP989kgAioKgzpRZ1kDpjRmlL25gLtMyUVlHr+GPUiloTEBMRtBK1VBGPAZRfBg0KEgkwba21VrQyIsVxoGhy4mA7lsGqgHa0daooREAguXvv2z9yd0kwB7ebu2ST7Gfmzdx+d993v+999/ved9/uHgQEBAQEBAQEBAQEBAQEBAQE9BbES6VRkW39+zblz1B0AnAmEMquWd0GA/xbRZ7i0MH50SXhw24VuHbAqMi2/gVH+ryK6AVu6/ZolHptPDzOrRP6uD1P3yZnhooJOv9ohLAUFNwDzHZTzbUDVO0ENHlO7m3o2+/hHZHCJrd6egKFkR35gw8fuUtF5yVEN+DSAY7rs6o9Eyxg6c2dD7AjUtg08NDAh5P9AfYstzrcOwANgQJKb+78JC8vHdGY7I/mvnGH6yEIte2Ki2e88aCoVgL5rnV2L5qAxfULiu9LSdL0SSZ4iYBWpQVRWwma33Z/jyz5oJWZ9EkmZC0CUNvTr/zWFLTZ6kAEuHcA6U7WIq9f+CNPN3h+J3zPljSXeGc6QNPYkE7ek8hB23MSAT2X7LfdgwPSebsXREAO2p7NSdizEa0Jz9wRyYqiNNTPLfSuPwdt918EKA9kR1FaOuDgXhABvsYfEZDjSVjcLWZ1Ln6YhHOchnZojM41QRra1fghArI4EY2euX2sxRnr3obs4WA3vz73vM2ZHd3DJmGLM7YTsp5j2yAOQGYO8MckHNyIZS4/Pl0aAQ52c+IK7DIcbIbDD36JgOxNRImxN/MO6HL8MAkHq6GZyzOgUyMgPHO7f3P8VtTPPS+NnX6IgI5MRLZrMx4XpHFAD5uEux3+mIQ7chVYH6/zZEI3j4D6B0d2izkgLf6IgGAtKHP58QnSUDd09zS0+9ObIyAScUo+/eYP1QldDloCDAW+ATQqfOLAR6hsDDnmhS2PTf4wJzb0zghQKZm68hrdw1x1OLv5o5Q29BMYrHAuwkVxpSo8tWajijMjuvTmf2TXFj9EQCeuho6+Y8UwE3/yT6oUuaqo/EzUjiueUlOz/7TBd+yIXJOlt7iz33Yv3we0lEzkHgnf9kSxjemboraole4vwNZg9VIcPVvzD/bPz8s7KRS3hagpQ+0LqI0ljnUEWzHos72vjpm26tSsGJWDtvtyCCq6ddn5qN0IDEiIGlEWmT7xRVuX3r7/qMMPAw3AO8CaovInRjghO1/gysT+0cY0bhh1y4oxb9WUH+qYZX4YgnI8CYcrlp8G9kU00fnCpxi9on7F1Ggm9beuqNgJXFU85fE7RFkM9AH9Xt+QXQN6LYh3Q3vFJCyxxSBnJLb2iZof16341XvJ3dUb/jMyZJ0K4CcqnI7QiLILlXV5RpeV/3zo5wDRZbc9Gp5S/SUqqwEUri6Z8thzdct4xrtx2W+7hzlAW0omcheMLq8eiXJ9Qo+qcl3d8ubOX7FtW96j6z+uVqN/j6upiKsZYazpZ4wZbKz5vtH47COO2f3oSx9PSOqrX3b7GlSrk3ap1XmFV0e8f8eQg7Z7eB5oW5VM5C40i50B1gGLin0++sS0vwJEIup89b8hzxgbn2Y07hiNk6YMNBr/fdW6DyuSOk0e94Pdk7Bt+KAhJ13r2cActN03Dhg/rboA7MUpHcamFu5OGLW70lhzhbGGDIoYTPXD6z4YCbB16e37EZP6klEwV3gy8Jht7EwH5GgIaog1jUV1YLMO+160Zvp2gOr1OwdaY+611pBxMSYvbmNzWxrpPJsahlQvHFsa6evJyJ48BDlwbqv6G5PyA0diFxsbH2xsHFfFxMc/uPZfQwBeX37nB2B3J/T3b8wfcKYnI3PQdv+koWqHJm8oVfWjpNjY2Cjx9p8iISt6PrApofQjYDiAWIYC77q3sZukoeHyh37tVquqbfWKou5NaVVzMurtmz8Rc0rqN/q5JjwsDpPC5Q/9wLXCtHe6frsRU+a7N6WlvqMMSf62xnzhXldKz56UHrWnJt2oMAFlQppqGdnYVuyPCNgFnO3ZktaaRIYlfxuNv+UxAmJNGns7uSHYb2XDtgQ722764JGk2th4QqHrRDnBkyXCaShlACL8NCmOHTLrpa80CAx2qXDD/OvH7AMI3zJnOGqHJ3Y0Ao94srFZ70FEn24r88EQFK2N7ALmeDWk+M6qfnLg4C+AfijnFN0cOX/rysg/F04afeDu3/1tHsgiF+piDnJ/ymSrVydjSGBT3cpZM7za2S4dGIK8pKEHkilX8aRIVoYcgOiS6YfBrk3q7tPq5agTdm+qitv42gxTULUmPnXBjWPeBii6PjJQsNOTehX7VLZsBigqnzMilYKKPXql9ri4HlxLJj3wssJFic1dovK0iv3KrZ72cQpBb0yYpgoXR2sjGwAikU19Gs4wi0Gnkf7CaRDk1iVl4/6YFBRPemCpwNTEphVktmIbs2OvDAC5DjQ5vK2vr519iSsNbk8Znnh/McIWPM0frmnQUKg4WhNJ5exTV790nthQOTAOZBiiR1B2orrO5uUtf/ymcamsKXzzrDJUV3WCnQAxxzLm9dVztrqp5Cm9CE+87yqQJ4GTvNR3yWdW5Mo3aufUualUUjbzThUW0Tn/6LhP0UnRVfOed1vR87+ajC2NDI45sUsUHQF4W1tJzxgg3Gq7UZWqpjyz4K2aBV8eq2LJxJnnKHYhcFmbHcJrKPVZtvOICu8XmPz1m9dEGrwo8OXfyoTLfjMHdObX98hexD6n6ryIo++yv/G/obyCvpqnQ61IEcLlAuNpZ3hUYVZ01XzPWVqu6Ixx3ANt8upDQP/mn3oyymTBTsYCA/KxyeWFr9+lWuAT4PRE3Rza652u/UArLS2riypmvojegOj7bVcd0xYF+woavwDsmmw8KMol/owAS+rZuaBat3rhU8AfSkrvHq1iL8VKGOEs4BSUmAp7RHWHilNHKP7naO2SXQDhm+6+LPUM3p8B4FMHtH+1at2aRa8Br3nT408P+HQI6j0EDuhiAgd0MT6dA47PmLJpp1pbcJk6WHXMX6K1S/Yev5b/6I4RICWllRVG83er6EpUV4lxPigunT6xqw3zQreKgPCkyjMkzkqFcUftGiRIbbi08po+opO3rK76uEsM9EB3iQApKa2swLBdpaXztfmN6PdbHXdhXGV7d4oG/ztAdVi4tPIVheXAiQmpAV1QwImj9Cv7HZAqWpL+QYLUlpTe9TKSXIYAkQ68FZ1DfDoEyZ6WGyeZ3HqPwjtYWxb97ZI3W4kri8umPyfNb0J/u/k4vah1PSyf5dJir/gyAkIm/iyw7yhx6qo/qvMBiK6uqm8nGppRPs8vYG3uLPaOL5ejAYp/Of274shigXMV3lZrZ7XX8e3WLZsedqzMVqEQdLuid0XXLNmea5sDAgICAgICAgICAgICAgICAgKOxf8Blem+Nr9e5H4AAAAASUVORK5CYII="/>,
        title:"Certificats",
        count: <CountUp end={100} duration={4} />,
    },
    {
        icon:<img src="data:image/png;base64,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"/>,
        title:"Instructeurs",
        count: <CountUp end={20} duration={4} />,
    },
    {
        icon:<img src="data:image/png;base64,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"/>,
        title:"Apprenants",
        count: <CountUp end={50} duration={4} />,
    },
];


function Ft() {
    const classes = useStyles();
    return (
        <Box pb={7} className={classes.feature}>
        <Grid container className={classes.gridStyle} alignItems="center">
          {featureList.map((item) => (
            <Box m={2} display="flex" alignItems="center" key={item.title} className={classes.col}>
              <Avatar variant="square" className={classes.avatar}>{item.icon}</Avatar>
              <Box ml={1} display="flex" flexDirection="column">
                <Box display="flex" alignItems="center" className="text">
                  +{item.count ? item.count : null}
                  <Typography variant="subtitle1" className={classes.title}>{item.title}</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    )
}

export default Ft
