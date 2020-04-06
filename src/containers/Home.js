import React,{useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import axios from 'axios';
import { Typography } from '@material-ui/core';

import logo from '../images/react-name-logo.svg'

const useStyles = makeStyles((theme) => ({
    box: {
      padding: "10px",
      margin: "10px"
    },
    content:{
        paddingTop: "20px",
        height: "300px",
    },
    logo: {
        width: "243px",
        height: "243px"
    }
  }));

function Home() {
    const classes = useStyles();
    const [nameDatabase, setNameDatabase] = useState([]);
    const [char1, setChar1] = useState("")
    const [char2, setChar2] = useState("")
    const [loading, setLoading] = useState(true);
    const [generated, setGenerated] = useState(false);

    useEffect(() => {
        axios.get('https://mojikiban.ipa.go.jp/mji/q?漢字施策=人名用漢字')
        .then(res => {
            setNameDatabase(res.data.results);
        })
        .then(() => {
            setLoading(false);
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const handleGeneratorClick = () => {
        let c1 = nameDatabase[Math.floor( Math.random() * 2999 )];
        let c2 = nameDatabase[Math.floor( Math.random() * 2999 )];

        let yomi1;
        let yomi2;

        if(c1.読み.音読み){
            yomi1 = c1.読み.音読み[0]
        } else {
            yomi1 = c1.読み.訓読み[0]
        }

        if(c2.読み.音読み){
            yomi2 = c2.読み.音読み[0]
        } else {
            yomi2 = c2.読み.訓読み[0]
        }

        setChar1({
            image: c1.MJ文字図形.uri,
            yomi: yomi1,
            strokes: c1.総画数,
        });

        setChar2({
            image: c2.MJ文字図形.uri,
            yomi: yomi2,
            strokes: c2.総画数,
        });
        setGenerated(true);
    }

    return (
        <div>
            <Box className={classes.content}>
            { loading || !generated ? (
                <img src={logo} alt="logo" className={classes.logo}/>
            ) : (
                <div>
                    <Box display="flex" justifyContent="center">
                        <Box>
                            <p>{char1.yomi}</p>
                            <img src={char1.image} alt="char1"/>
                            <p>{char1.strokes}画</p>
                        </Box>
                        <Box>
                            <p>{char2.yomi}</p>
                            <img src={char2.image} alt="char2"/>
                            <p>{char2.strokes}画</p>
                        </Box>
                    </Box>
                    <Typography>{char1.strokes + char2.strokes}画</Typography>
                </div>
            ) }
            </Box>
            <Box className={classes.box}>
                <Button onClick={handleGeneratorClick} color="primary" variant="contained">名前を生成する</Button>
            </Box>
            <Box >
                <Typography>※独立行政法人情報処理推進機構(IPA)のMJ文字情報APIを使用しています。</Typography>
            </Box>
            <Box className={classes.box}>
                <Typography>© 2020 shintaro-hirose</Typography>
            </Box>
            
        </div>
    )
}

export default Home;
