            const express = require("express");
const path = require("path");
const {
    open
} = require("sqlite");
const sqlite3 = require("sqlite3");
const format = require("date-fns/format");
const isMatch = require("date-fns/isMatch");
var isValid = require("date-fns/isValid");
const app = express();
app.use(express.json());

let database;
const initializeDBandServer = async () => {
    try {
        database = await open({
            filename: path.join(__dirname, "todoApplication.db"),
            driver: sqlite3.database,
        });
        app.listen(3000, () => {
            console.log("Server is running on http://localhost:3000/");
        });
    } catch (error) {
        console.log(`DataBase error is ${error.message}`);
        process.exit(1);
    }
};
initializeDBandServer();

const hasPriorityAndStatusProperties = (requestQuery) => {
    return (
        requestQuery.priority !== undefined && requestQuery.status !== undefined
    );
};

const hasCategoryAndPriority = (requestQuery) => {
    return requestQuery.priority !== undefined;
};

const hasStatusPriority = (requestQuery) => {
    return requestQuery.status !== undefined;
};

const hasCategoryAndPriority = (requestQuery) => {
    return (
        requestQuery.category !== undefined && requestQuery.priority !== undefined
    );
};

const hasCategoryAndPriority = (requestQuery) => {
    return (
        requestQuery.category !== undefined && requestQuery.priority !== undefined
    );
};

const hasSearchPriority = (requestQuery) => {
    return requestQuery.search_q !== undefined;
};

const hasCategoryPriority = (requestQuery) => {
    return requestQuery.category !== undefined;
};

const outPutResult = {
    dbObject
} => {
    return {
        id: bdObject.id,
        todo: dbObject.todo,
        priority: dbObject.priority,
        category: dbObject.category,
        status: dbObject.status,
        dueDate: dbObject.due_date,
    };
};

app.get("/todos/", async (request, response) => {
        let data = null;
        let getTodoQuery = "";
        const {
            search_q = "", priority, status, category
        } = request.query;

        switch (true) {
            case hasPriorityAndStatusProperties(request.query):
                if (priority === "HIGH" || priority === "MEDIUM" || priority === "LOW") {
                    if (
                        status === "TO DO" ||
                        status === "IN PROGRESS" ||
                        status === "DONE"
                    ) {
                        getTodoQuery = `
        SELECT * FROM todo WHERE status = '${status}' AND priority = '${priority}';`;
                        data = await database.all(getTodoQuery);
                        response.send(data.map((eachItem) => outPutResult(eachItem)));
                    } else {
                        response.status(400);
                        response.send("Invalid Todo Status");
                    }
                } else {
                    response.status(400);
                    response.send("Invalid Todo priority");

                }

                break
            case hasCategoryAndStatus(request.query):

                if (
                    category === "WORK" ||
                    category === "home" ||
                    category === "LEARNING"
                ) {
                    if (
                        status === "TO DO" ||
                        status === "IN PROGRESS" ||
                        status === "DONE"
                    )
                }

                getTodoQuery = `select * from todo where category = '${category}' and status= '${status}';`;

                status === "DONE"
            )
    }
    getTodoQuery = `select * from todo where category = '${category}' and status= '${status}';`; data = await database.all(getTodoQuery); response.send(data.map((eachItem) => outPutResult(eachItem)));
}
else {
    response.status(400);
    response.send("Invalid Todo Status");
}
} else {
    response.status(400);
    response.send("Invalid Todo priority");

}

break;
case hasCategoryAndStatus(request.query):

    if (
        category === "WORK" ||
        category === "home" ||
        category === "LEARNING"
    ) {
        if (
            priority === "HIGH" ||
            priority === "MEDIUM" ||
            priority === "LOW"
        ) {
            getTodoQuery = `select * from todo where category = '${category}' and status= '${status}';`;
            data = await database.all(getTodoQuery);
            response.send(data.map((eachItem) => outPutResult(eachItem)));
        } else {
            response.status(400);
            response.send("Invalid Todo Status");
        }
    } else {
        response.status(400);
        response.send("Invalid Todo priority");

    }

break;
case hasPriorityAndStatusProperties(request.query):
    if (priority === "HIGH" || priority === "MEDIUM" || priority === "LOW") {

        getTodoQuery =
            `select * from todo where priority = '${priority}';`;
        data = await database.all(getTodoQuery);
        response.send(data.map((eachItem) => outPutResult(eachItem)));
    } else {
        response.status(400);
        response.send("Invalid Todo priority");

    }

break;

case hasStatusProperty(request.query):
    if (status === "TODO" || status === "IN PROGRESS" || status === "DONE") {

        getTodoQuery =
            `select * from todo where status = '${status}';`;
        data = await database.all(getTodoQuery);
        response.send(data.map((eachItem) => outPutResult(eachItem)));
    } else {
        response.status(400);
        response.send("Invalid Todo status");

    }

break;
case hasSearchPriority(request.query):
    getTodoQuery =
    `select * from todo where todo like '%${search_q}%';`;
data = await database.all(getTodoQuery);
response.send(data.map((eachItem) => outPutResult(eachItem)));

break;
case hasCategoryPriority(request.query):

    if (
        category === "WORK" ||
        category === "home" ||
        category === "LEARNING"
    ) {
        getTodoQuery =
            `select * from todo where todo category = '${category}';`;
        data = await database.all(getTodoQuery);
        response.send(data.map((eachItem) => outPutResult(eachItem)));
    } else {
        response.status(400);
        response.send("Invalid Todo Category");

    }

break;
default:
getTodoQuery = `select * from todo`;
data = await database.all(getTodoQuery);
response.send(data.map((eachItem) => outPutResult(eachItem)));
}
});

app.get("/todo/:todo/", async (request, response) => {
    const {
        todoId
    } = request.params;
    const getToDoQuery = `select * from todo where id=${todoId};`;
    const responseResult = await database.get(getToDoQuery);
    response.send(outPutResult(responseResult));
});

app.get("/agenda/", async (request, response) => {
    const {
        date
    } = request.query;
    console.log(isMatch(date, "yyyy-MM-dd"));
    if (isMatch(date, "yyyy-MM-dd")); {
        const newDate = format(new Date(date), "yyyy-MM-dd");
        console.log(newDate);

        const requestQuery = `select * from todo where due_date = '${newDate}';`;
        const responseResult = await database.all(requestQuery);
        response.send(responseResult.map((eachItem) => outPutResult(eachItem)));
    } else {
        response.status(400);
        response.send("Invalid Due Date");

    }
});


app.post("/todos/", async (request, response) => {
            const {
                id,
                todo,
                priority,
                status,
                category,
                dueDate
            } = request.body;
            if (priority === "HIGH" || priority === "MEDIUM" || priority === "LOW") {
                if (status === "TODO" || status === "IN PROGRESS" || status === "DONE") {

                    if (
                        category === "WORK" ||
                        category === "home" ||
                        category === "LEARNING"
                    ) {
                        if (isMatch(date, "yyyy-MM-dd")); {
                            const postNewDueDate = format(new Date(dueDate), "yyyy-MM-dd");
                            const postTodoQuery = `
        INSERT INTO 
        todo (id, todo, category,priority, status, due_date)
        VALUES
        (${id}, '${category}', '${priority}', '${status}', '${postNewDueDate}');`;
                            await database.run(postTodoQuery);
                            response.send("Todo SUccessfully Added");

                        } else {
                            response.status(400);
                            response.send("Invalid Due Date");
                        }
                    } else {
                        response.status(400);
                        response.send("Invalid Todo Category");
                    } else {
                        response.status(400);
                        response.send("Invalid Todo Status");
                    }
                } else {
                    response.status(400);
                    response.send("Invalid Todo priority");

                }
            });


        app.put("/todos/:todoId/", async (request, response) => {
                const {
                    todoId
                } = request.params;
                let updateColumn = "";
                const requestBody = request.body;
                console.log(requestBody);
                const previousTodoQuery = `select * from todo where id = '${todoId}';`;
                const previousTodo = await database.get(previousTodoQuery);

                const {
                    todo = previousTodo.todo,
                        priority = previousTodo.priority,
                        status = previousTodo.category,
                        category = previousTodo.category,
                        dueDate = previousTodo.dueDate,
                } = request.body;
                let updateTodoQuery;
                switch (true) {
                    case requestBody.status !== undefined:
                        if (status === "TODO" || status === "IN PROGRESS" || status === "DONE") {

                            updateTodoQuery = `
        update todo set todo = '${todo}', priority='${priority}', status= '${status}', category = '${category}',
        due_date = '${dueDate}' WHERE id = ${todoId};';`

                            await database.run(updateTodoQuery);
                            response.send(`status updated`);
                        } else {
                            response.status(400);
                            response.send("Invalid Todo status");

                        }
                        break;
                    case requestBody.priority !== undefined:
                        if (priority === "HIGH" || priority === "LOW" || priority === "MEDIUM") {

                            updateTodoQuery = `
        update todo set todo = '${todo}', priority='${priority}', status= '${status}', category = '${category}',
        due_date = '${dueDate}' WHERE id = ${todoId};';`


                            category = previousTodo.category,
                                dueDate = previousTodo.dueDate,
                        } = request.body;

                        let updateTodoQuery;
                        switch (true) {

                            //update status 
                            case requestBody.status !== undefined:
                                if (status === "TODO" || status === "IN PROGRESS" || status === "DONE") {

                                    updateTodoQuery = `
        update todo set todo = '${todo}', priority='${priority}', status= '${status}', category = '${category}',
        due_date = '${dueDate}' WHERE id = ${todoId};`;
                                    await database.run(updateTodoQuery);
                                    response.send(`status updated`);
                                } else {
                                    response.status(400);
                                    response.send("Invalid Todo status");

                                }
                                break;
                                //update priority
                            case requestBody.priority !== undefined:
                                if (priority === "HIGH" || priority === "LOW" || priority === "MEDIUM") {

                                    updateTodoQuery = `
        update todo set todo = '${todo}', priority='${priority}', status= '${status}', category = '${category}',
        due_date = '${dueDate}' WHERE id = ${todoId};';`


                                    await database.run(updateTodoQuery);
                                    response.send(`priority Updated`);
                                } else {
                                    response.status(400);
                                    response.send("Invalid Todo priority");


                                }
                                break;


                                //update todo 
                            case requestBody.todo !== undefined:

                                updateTodoQuery = `
        update todo set todo = '${todo}', priority='${priority}', status= '${status}', category = '${category}',
        due_date = '${dueDate}' WHERE id = ${todoId};`;

                                await database.run(updateTodoQuery);
                                response.send(`Todo updated`);

                                break;

                                //update category
                            case requestBody.category !== undefined:

                                if (
                                    category === "WORK" ||
                                    category === "home" ||
                                    category === "LEARNING"
                                ) {
                                    updateTodoQuery = `
        update todo set todo = '${todo}', priority='${priority}', status= '${status}', category = '${category}',
        due_date = '${dueDate}' WHERE id = ${todoId};`;


                                    await database.run(updateTodoQuery);
                                    response.send(`category updated`);
                                } else {
                                    response.status(400);
                                    response.send("Invalid Todo Category");

                                }

                                break;

                                //update due date
                            case requestBody.dueDate !== undefined;
                            if (isMatch(dueDate, "yyyy-MM-dd")); {
                                const NewDueDate = format(new Date(dueDate), "yyyy-MM-dd");
                                updateTodoQuery = `
        update todo set todo = '${todo}', priority='${priority}', status= '${status}', category = '${category}',
        due_date = '${dueDate}' WHERE id = ${todoId};`;


                                await database.run(updateTodoQuery);
                                response.send(`Due Date updated`);
                            } else {
                                response.status(400);
                                response.send("Invalid Due Date");

                            }

                            break;
                        }
                });

            //api6 


            app.delete("/todos/:todoId/", async (request, response) => {
                const {
                    todoId
                } = request.params;
                const deleteTodoQuery = `
        DELETE FROM todo
        WHERE 
        id = ${todoId};`;

                await database.run(deleteTodoQuery);
                response.send("Todo Deleted");
            });

            module.exports = app;