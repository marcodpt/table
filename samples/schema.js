export default {
  title: "Complete table",
  description: "This is a complete table example!\nHope you enjoy! :)",
  links: [
    {
      href: "#/post",
      title: "Post",
      type: "success",
      icon: "pencil-alt"
    }
  ],
  items: {
    properties: {
      id: {
        title: "Id",
        href: "#/user/{id}",
        type: "integer"
      }, 
      register: {
        title: "Register",
        type: "string"
      },
      name: {
        title: "Name",
        type: "string"
      },
      gender: {
        title: "Gender",
        type: "string"
      },
      age: {
        title: "Age",
        type: "integer"
      },
      balance: {
        title: "Balance ($)",
        type: "number"
      },
      bio: {
        title: "Bio",
        format: "text",
        type: "string"
      }
    },
    links: [
      {
        href: "#/delete/{id}",
        title: "Delete",
        type: "danger",
        icon: "trash",
        batch: "#/batch/delete/{_ids}"
      }, {
        href: "#/put/{id}",
        title: "Edit",
        type: "warning",
        icon: "edit"
      }
    ]
  }
}
