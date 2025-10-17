describe("Blog App", function () {
  beforeEach(function () {
    cy.request("POST", "/api/testing/reset");
    const user = {
      name: "Ibrahim Aminu",
      username: "saint-ij",
      password: "safjirat",
    };
    cy.request("POST", "/api/users/", user);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("Login to Application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("input:first").type("saint-ij");
      cy.get("input:last").type("safjirat");
      cy.contains("button", "login").click();
    });

    it("fails with wrong credentials", function () {
      cy.get("input:first").type("pimp-jj");
      cy.get("input:last").type("fuckjirat");
      cy.contains("button", "login").click();

      cy.get(".error").contains("wrong credentials");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "/api/login", {
        username: "saint-ij",
        password: "safjirat",
      }).then(({ body }) => {
        localStorage.setItem("loggedInUser", JSON.stringify(body));
        cy.intercept("*", (req) => {
          let token = `Bearer ${body["token"]}`;
          req["headers"] = { Authorization: token };
        });
        cy.visit("");
      });
    });

    it("A blog can be created", function () {
      cy.contains("button", "new note").click();
      cy.contains("label", "title").type("a new blog");
      cy.contains("label", "author").type("by cypress");
      cy.contains("label", "url").type("www.example.com");

      cy.contains("button", "create").click();

      cy.contains("a new blog by cypress");
    });

    it("a blog can be liked", function () {
      cy.createBlog({
        title: "new blog",
        author: "by cypress",
        url: "www.example.com",
      });
      cy.visit("");
      cy.contains("button", "view").click();
      cy.get('span[data-testid="likes-count"]').as("likes");
      cy.contains("button", "like").click();
      cy.wait(2000);
      cy.get("@likes")
        .invoke("text")
        .then((text) => {
          expect(text).to.equal("1");
        });
    });

    it("a blog can be viewed and deleted", function () {
      cy.createBlog({
        title: "new blog",
        author: "by cypress",
        url: "www.example.com",
      });
      cy.visit("");
      cy.contains("button", "view").click();
      cy.contains("button", "remove").click();
      cy.wait(2000);
      cy.root().should("not.contain", "new blog by cypress");
    });

    it("blog is ordered by likes", function () {
      cy.createBlog({
        title: "most likes",
        author: "by cypress",
        url: "www.example.com",
        likes: 5,
      });
      cy.createBlog({
        title: "second most likes",
        author: "by cypress",
        url: "www.example.com",
        likes: 3,
      });
      cy.createBlog({
        title: "least likes",
        author: "by cypress",
        url: "www.example.com",
      });

      cy.visit("");
      cy.wait(2000);
      cy.get("div.blogs").eq(0).should("contain", "most likes by cypress");
      cy.get("div.blogs")
        .eq(1)
        .should("contain", "second most likes by cypress");
      cy.get("div.blogs").eq(2).should("contain", "least likes by cypress");
    });
  });
});

Cypress.Commands.add("createBlog", ({ title, author, url }) => {
  cy.request({
    url: "http://localhost:3003/api/blogs",
    method: "POST",
    body: { title, author, url },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("loggedInUser")).token}`,
    },
  });
});
