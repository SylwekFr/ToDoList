import React, { useEffect, useState } from 'react';
import { Button, List, Text } from 'react-native-paper';
import { container } from 'tsyringe';
import { SafeAreaView } from 'react-native-safe-area-context/lib/typescript/src/SafeAreaView';
import { GetAllToDos } from '../../application/usecases/GetAllTodos';
import { ToDo } from '../../domain/entities/ToDo';
import { StyleSheet } from 'react-native';
import AddToDoDialog from '../components/AddToDoDialog';


function HomeScreen(): React.JSX.Element {
  const [addDialogVisible, setAddDialogVisible] = useState(false);
  const showAddDialog = () => setAddDialogVisible(true);
  const hideAddDialog = () => setAddDialogVisible(false);
  const [toDos, setToDos] = useState<Partial<ToDo>[]>([]);
  const getAllToDosUseCase = container.resolve(GetAllToDos);

  useEffect(() => {
    const loadTasks = async () => {
      const toDos = await getAllToDosUseCase.execute();
      setToDos(toDos);
    };
    loadTasks();
  }, []);

  return (
      <SafeAreaView >
        {toDos.map((toDo) => (
          <List.Item
            key={toDo.id}
            title={
              <Text
                style={[
                  styles.taskText,
                  toDo.isCompleted && styles.strikethroughText,
                ]}
              >
                {toDo.title}
              </Text>
            }
          />
        ))}
        <Button icon="add" mode="contained" onPress={showAddDialog}>
          Create To Do List
        </Button>
        <AddToDoDialog
          visible={addDialogVisible}
          onDismiss={hideAddDialog}
        />
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    taskText: {
      fontSize: 16,
    },
    strikethroughText: {
      textDecorationLine: 'line-through',
      color: '#888',
    },
  });
  
  export default HomeScreen;
  