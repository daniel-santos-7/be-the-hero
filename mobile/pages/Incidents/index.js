import React from 'react';
import { View, FlatList, Text, Image } from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';

export default function Incidents(props) {

    const [incidents, setIncidents] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [loading, setLoading] = React.useState(false);

    const navigation = useNavigation();

    function navigateToDetails(incident) {
        navigation.navigate('details',{incident});
    }

    async function loadIncidents() {
        
        if(loading)
            return;

        if(total>0 && incidents.length === total)
            return;
        
        setLoading(true);
        const response = await api.get('incident',{ params: { page } });
        setIncidents(incidents.concat(response.data));
        setTotal(response.headers['x-total-count']);
        setLoading(false);
        setPage(page+1);
        console.log(incidents);

    }

    React.useEffect(()=> {
        loadIncidents();
    },[]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
            <FlatList style={styles.incidentsList}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.8}
                data={incidents} 
                keyExtractor={(incident)=> String(incident.id)}
                renderItem={({item:incident})=> (
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>
                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>
                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>
                        {/* {Intl.NumberFormat('pt-BR', { style:'currency', currency: 'BRL'  }).format(incident.value)} */}
                        R$ {incident.value}
                    </Text>
                    <TouchableOpacity style={styles.detailsButton} onPress={()=>navigateToDetails(incident)}>
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#e02041"/>
                    </TouchableOpacity>
                </View>
                )}
            />
        </View>
    );
}