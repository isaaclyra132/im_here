import { Text, TextInput, TouchableOpacity, View, FlatList, Alert } from 'react-native';

import { Participant } from '../../components/Participant';

import { styles } from './styles';

export function Home() {
    const participants = ["Isaac de Lyra", "Jully Thamires", "Pedro Henrique", "Brenda Calado", "Maria Eduarda"]

    function handleParticipantAdd() {
        if (participants.includes("Isaac de Lyra")) {
            return Alert.alert("Participante existe", "Já existe um participante na lista com esse nome")
        }
    }

    function handleParticipantRemove(name: string) {
        Alert.alert("Remover", `Remover o participante ${name}?`, [
            {
                text: 'Sim',
                onPress: () => Alert.alert("Deletado")
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ])
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>
                Nome do evento
            </Text>

            <Text style={styles.eventDate}>
                Sexta, 4 de novembro de 2022.
            </Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do participante"
                    placeholderTextColor="#6B6B6B"
                />

                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Listagem utilizando ScrollView */}
            {/* <ScrollView showsVerticalScrollIndicator={false}>
                {
                    participants.map(participant => (
                        <Participant
                            key={participant}
                            name={participant}
                            onRemove={() => handleParticipantRemove(participant)}
                        />
                    ))
                }
            </ScrollView> */}

            {/* FlatList é mais performática, pois renderiza apenas os elementos que cabem na tela */}
            <FlatList
                data={participants}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Participant
                        key={item}
                        name={item}
                        onRemove={() => handleParticipantRemove(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
                    </Text>
                )}
            />

        </View>
    )
}