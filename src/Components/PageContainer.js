import React from 'react';
import { View, StyleSheet,Animated } from 'react-native';

function PageContainer(props) {
    return (
        <Animated.View style={styles.container}>
             {props.children}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        
    }
})

export default PageContainer;