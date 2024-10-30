import React, { useState } from 'react';
import { Dialog, Portal, Button, TextInput, Checkbox } from 'react-native-paper';
import { ToDo } from '../../domain/entities/ToDo';
import {v4 as uuidv4} from 'uuid';
import { ScrollView, View } from 'react-native';
import { container } from 'tsyringe';
import { AddToDos } from '../../application/usecases/AddToDo';

interface ToDoDialogProps {
  visible: boolean;
  onDismiss: () => void;
}

const ToDoDialog: React.FC<ToDoDialogProps> = ({ visible, onDismiss }) => {
  
  const [toDo, setToDo] = useState<ToDo>({
    description: '',
    id: uuidv4(),
    isCompleted: false,
    tasks:[],
    title: ''
  })

  const handleAddTask = () => {
    setToDo({
      ...toDo,
      tasks: [...toDo.tasks, { description: '', isCompleted: false }]
    });
  };

  const handleTaskChange = (index: number, field: 'description' | 'isCompleted', value: string | boolean) => {
    const updatedTasks = [...toDo.tasks];
    updatedTasks[index] = { ...updatedTasks[index], [field]: value };
    setToDo({ ...toDo, tasks: updatedTasks });
  };

  const addToDoUseCase = container.resolve(AddToDos);
  const addToDo = async() => {
    try{
      await addToDoUseCase.execute(toDo)
      setToDo({
        description: '',
        id: '', 
        isCompleted: false,
        tasks: [],
        title: ''
      });
      onDismiss();
    } catch(error){
      console.error('Error adding ToDo:', error)
    }
    
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Create To Do</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Title"
            value={toDo.title}
            onChangeText={text => setToDo({...toDo, title: text})}
            mode="outlined"
          />
          <TextInput
            label="Description"
            value={toDo.description}
            onChangeText={text => setToDo({...toDo, description: text})}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={{ marginTop: 10 }}
          />
          <ScrollView style={{ marginTop: 10, maxHeight: 200 }}>
            {toDo.tasks.map((task, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Checkbox
                  status={task.isCompleted ? 'checked' : 'unchecked'}
                  onPress={() => handleTaskChange(index, 'isCompleted', !task.isCompleted)}
                />
                <TextInput
                  style={{ flex: 1 }}
                  mode="outlined"
                  placeholder="Task description"
                  value={task.description}
                  onChangeText={(text) => handleTaskChange(index, 'description', text)}
                />
              </View>
            ))}
            <Button icon="plus" mode="outlined" onPress={handleAddTask} style={{ marginTop: 10 }}>
              Add Task
            </Button>
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={addToDo}>Add</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ToDoDialog;
