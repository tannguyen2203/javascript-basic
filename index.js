const apiUrl = "https://6405e6d6eed195a99f902668.mockapi.io/api/coures";

function start() {
  getCourses(render);

  createHandlerForm();
}

start();

function getCourses(callback) {
  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      courses = data; // Lưu trữ dữ liệu vào biến courses
      callback(data);
    })

    .catch((error) => {
      console.log(error);
    });
}

function render(courses) {
  const listCourse = document.querySelector("#list-courses");
  var html = courses.map((course) => {
    return `<li class="course-item-${course.id}">
      <h4>Ten khoa hoc: ${course.name} </h4>
      <p>Noi dung: ${course.description}</p>
      <button onclick="handleDeleteCourse(${course.id})">Xoa</button>
      <button onclick="updateCourse(${course.id})">Update</button>
    </li>`;
  });
  listCourse.innerHTML = html.join("");
}

function createHandlerForm() {
  var createBtn = document.querySelector("#create");
  createBtn.onclick = () => {
    var name = document.querySelector('input[name = "name"]').value;
    var description = document.querySelector(
      'input[name = "description"]'
    ).value;
    var objectData = {
      name: name,
      description: description,
    };
    createCrouse(objectData, function () {
      getCourses(render);
    });
  };
}

function createCrouse(data, callback) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  };

  fetch(apiUrl, options)
    .then((response) => {
      return response.json();
    })
    .then(callback)
    .catch((error) => {
      console.log(error);
    });
}

//

function handleDeleteCourse(id) {
  const options = {
    method: "Delete",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(`${apiUrl}/${id}`, options)
    .then((response) => {
      return response.json();
    })
    .then(() => {
      var deleteItem = document.querySelector(`.course-item-${id}`);
      if (deleteItem) {
        deleteItem.remove();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateCourse(id) {
  // Lấy giá trị của name và description từ ô input
  var name = document.querySelector('input[name="name"]').value;
  var description = document.querySelector('input[name="description"]').value;

  // Tạo đối tượng dữ liệu để gửi lên server
  var data = {
    name: name,
    description: description,
  };

  // Gọi API để cập nhật khoá học
  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((updatedCourse) => {
      // Cập nhật dữ liệu trên trang web
      document.querySelector('input[name="name"]').value = updatedCourse.name;
      document.querySelector('input[name="description"]').value =
        updatedCourse.description;

      getCourses(render);
    })
    .catch((error) => {
      console.error("Error updating course:", error);
    });
}
