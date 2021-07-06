export default {
  title: "Simple table",
  description: "This is a very simple table example!\nHope you enjoy! :)",
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
        href: "#/user/{id}"
      }, 
      register: {
        title: "Register"
      },
      name: {
        title: "Name"
      },
      age: {
        title: "Age"
      },
      balance: {
        title: "Balance ($)"
      },
      bio: {
        title: "Bio",
        format: "text"
      }
    },
    links: [
      {
        href: "#/delete/{id}",
        title: "Delete",
        type: "danger",
        icon: "trash"
      }, {
        href: "#/put/{id}",
        title: "Edit",
        type: "warning",
        icon: "edit"
      }
    ]
  }
}
