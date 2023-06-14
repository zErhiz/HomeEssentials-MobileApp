import Banner from '../../assets/Banners/Recurso45.png'
import Banner2 from '../../assets/Banners/Recurso46.png'
import Banner3 from '../../assets/Banners/Recurso47.png'
import Banner4 from '../../assets/Banners/Recurso48.png'
import Banner5 from '../../assets/Banners/Recurso49.png'
import { StylesNew } from "../../styles/Stylescss";
import { View, ScrollView, Image } from "react-native";
import { useState, useEffect } from "react";


function Carrousel() {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % 5);
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (

        <ScrollView
            style={{
                marginTop: 15,
                marginHorizontal: 10,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentOffset={{ x: currentIndex * 340, y: 0 }}
            onMomentumScrollEnd={(event) => {
                const contentOffset = event.nativeEvent.contentOffset;
                const index = Math.floor(contentOffset.x / 340);
                setCurrentIndex(index);
            }}
        >
            <Image
                style={StylesNew.carrousellProd}
                source={Banner}
            />
            <Image
                style={StylesNew.carrousellProd}
                source={Banner3}
            />
            <Image
                style={StylesNew.carrousellProd}
                source={Banner5}
            />
            <Image
                style={StylesNew.carrousellProd}
                source={Banner2}
            />
            <Image
                style={StylesNew.carrousellProd}
                source={Banner4}
            />

        </ScrollView>
    )
}

export default Carrousel