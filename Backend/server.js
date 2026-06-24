const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/task.model");
const cors = require("cors");

const app = express();

app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 4000;

//Delete all tasks
app.delete('/tasks/', async (req, res) => {
    try{ 
        const result = await Task.deleteMany({});
    
    res.status(200).json({message: "All tasks deleted successfully"});
       }catch (error) {
        res.status(500).json({message: error.message});
       }
})

// Task completion
app.patch("/tasks/:id/done", async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
  
      if (!task) {
        return res
          .status(404)
          .json({ message: "Task not found" });
      }
  
      task.taskDone = !task.taskDone;
  
      await task.save();
  
      res.status(200).json(task);
  
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

//Update a task
app.put('/tasks/:id', async (req,res) => {
    try{
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(id, req.body, {new:true})
    if(!task) {
        return res.status(404).json({message: "Task not found"})
    }
    res.status(200).json(task);
        }catch(error) {
            res.status(500).json({message: error.message})
        }
})

//Delete a task
app.delete('/tasks/:id', async (req, res) => {
    try{ 
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
    if(!task) {
        return res.status(404).json({message: "Task not found"});
    }
    res.status(200).json({message: "Task deleted successfully"});
       }catch (error) {
        res.status(500).json({message: error.message});
       }
    })

// Show a single task
app.get('/tasks/:id', async (req,res) => {
    try{
        const { id } = req.params;
        const task = await Task.findById(id)
    if (!task) {
            return res.status(404).json({message: 'Task not found'})
        }
        res.status(200).json(task);
    }catch(error) {
            res.status(500).json({message: error.message})
        }
    })

//Show all tasks
app.get('/tasks', async (req,res) => {
    try{
        const tasks = await Task.find ({});
        res.status(200).json(tasks);
    }catch(error) {
            res.status(500).json({message: error.message})
        }
    })

//Create a new task
app.post('/tasks', async (req,res) => {
    try {
const task = new Task(req.body);
await task.save()
res.status(201).json(task);
    }catch(error) {
        res.status(400).json({message: error.message});
    }
}
)

mongoose.connect("mongodb+srv://joannenashe_db_user:PJJL;^()aks@cluster0.c29kgwi.mongodb.net/todonow=?retryWrites=true&w=majority"
)
.then( () => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}) .catch((err) => {
    console.log("Conection failed");
    console.log(err);
});