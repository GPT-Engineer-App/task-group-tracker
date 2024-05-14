import React, { useState } from "react";
import {
  Container,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Select,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newProject, setNewProject] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "backlog",
    project: "",
  });
  const toast = useToast();

  const addProject = () => {
    if (newProject.trim() === "") {
      toast({
        title: "Project name cannot be empty.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setProjects([...projects, newProject]);
    setNewProject("");
  };

  const addTask = () => {
    if (newTask.title.trim() === "" || newTask.project.trim() === "") {
      toast({
        title: "Task title and project cannot be empty.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, newTask]);
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      status: "backlog",
      project: "",
    });
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={8}>
        <Heading>Task Tracker</Heading>

        <Box w="100%">
          <Heading size="md" mb={4}>
            Add New Project
          </Heading>
          <HStack>
            <Input
              placeholder="Project Name"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
            />
            <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addProject}>
              Add Project
            </Button>
          </HStack>
        </Box>

        <Box w="100%">
          <Heading size="md" mb={4}>
            Add New Task
          </Heading>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Task Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Due Date</FormLabel>
              <Input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              >
                <option value="backlog">Backlog</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Project</FormLabel>
              <Select
                placeholder="Select Project"
                value={newTask.project}
                onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
              >
                {projects.map((project, index) => (
                  <option key={index} value={project}>
                    {project}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addTask}>
              Add Task
            </Button>
          </VStack>
        </Box>

        <Box w="100%">
          <Heading size="md" mb={4}>
            Tasks
          </Heading>
          {tasks.map((task, index) => (
            <Box key={index} p={4} shadow="md" borderWidth="1px" mb={4}>
              <HStack justify="space-between">
                <Box>
                  <Text fontWeight="bold">{task.title}</Text>
                  <Text>{task.description}</Text>
                  <Text>Due Date: {task.dueDate}</Text>
                  <Text>Status: {task.status}</Text>
                  <Text>Project: {task.project}</Text>
                </Box>
                <Button
                  leftIcon={<FaTrash />}
                  colorScheme="red"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </Button>
              </HStack>
            </Box>
          ))}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;