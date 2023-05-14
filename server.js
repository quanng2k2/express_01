// khởi tạo server
const express = require("express");
const server = express();
const port = 3000;
const fs = require("fs");
const bodyParser = require("body-parser");
// định nghĩa các http request để hứng request từ client.

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.json({
    messsager: "hello !",
  });
});

server.get("/users", (req, res) => {
  // lôi query string
  try {
    const users = JSON.parse(fs.readFileSync("./database/user.json"));
    let { lat, lng } = req.query;
    if (lat && lng) {
      //get users from database that have
      let result = users.filter(
        (e, i) => e.address.geo.lat === lat && e.address.geo.lng === lng
      );
      res.json(result);
    } else {
      res.json(users);
    }
  } catch (error) {
    res.json({ error: error });
  }
});

server.get("/users/:id", (req, res) => {
  let { id } = req.params;
  try {
    const users = JSON.parse(fs.readFileSync("./database/user.json"));
    let finfUsers = users.find((e, i) => e.id === +id);
    if (finfUsers) {
      res.json(finfUsers);
    } else {
      res.json({
        message: "users not found",
      });
    }
  } catch (err) {
    res.json({ err: err });
  }
});

// post
server.post("/users", (req, res) => {
  let { username, email } = req.body;
  let finfUsers = users.find((e, i) => e.id === +id);
  if (!username || !email) {
    message: "Email hoặc username ko hợp lệ !";
  } else {
    let newUser = {
      id: Math.floor(Math.random() * 1000000000000),
      name: null,
      username: username,
      email: email,
      address: {
        street: null,
        suite: null,
        city: null,
        zipcode: null,
        geo: {
          lat: null,
          lng: null,
        },
      },
      phone: null,
      website: null,
      company: {
        name: null,
        catchPhrase: null,
        bs: null,
      },
    };
    try {
      let users = JSON.parse(fs.readFileSync("./database/user.json"));
      fs.writeFileSync("./database/user.json", JSON.stringify(users));
      res.json({
        message: "success",
      });
      users.push(newUser);
    } catch (error) {
      res.json({
        message: "Error parsing",
      });
    }
  }
});

server.put("/users/:id", (req, res) => {
  let { id } = req.params;
  let { name, phone } = req.body;
  if (!name || !phone) {
    message: "Phone và name ko hợp lệ !";
  } else {
    let newUser = {
      id: id,
      name: name,
      username: username,
      email: email,
      address: {
        street: null,
        suite: null,
        city: null,
        zipcode: null,
        geo: {
          lat: null,
          lng: null,
        },
      },
      phone: phone,
      website: null,
      company: {
        name: null,
        catchPhrase: null,
        bs: null,
      },
    };
    try {
      let data = fs.readFileSync("./database/user.json");
      let users = JSON.parse(data);
      let userIndex = users.findIndex((user) => user.id === id);
      if (!userIndex) {
      }
    } catch (error) {
      res.json({ message: "Lỗi server" });
    }
    // tìm kiếm user trong database thông qua id

    // nếu ko tìm thấy res về lỗi

    // nếu tìm thấy

    // tiến hành update

    // res về massage update thành công
  }
});

server.delete("/users", (req, res) => {
  // tìm kiếm user trong database thông qua id
  // nếu ko thấy  ---> res vê lỗi
  // nếu tìm thấy
  // delete
});

// cài đặt cho server luôn luôn chờ đợi và lắng nghe các req gửi lên từ client
server.listen(port, () => {
  console.log(`Example app listening on port http://localhost:3000`);
});
