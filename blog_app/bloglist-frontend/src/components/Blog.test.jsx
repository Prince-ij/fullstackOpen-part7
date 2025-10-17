import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";

describe("testing the blog component", () => {
  let addLikes;

  beforeEach(() => {
    const testBlog = {
      title: "Killing Machine",
      author: "John Rambo",
      url: "https://rambo's last blood.com",
      likes: 234,
      user: {
        name: "Bola Tinubu",
      },
    };

    addLikes = vi.fn();
    const deleteBlog = vi.fn();

    render(
      <Blog blog={testBlog} addLikes={addLikes} deleteBlog={deleteBlog} />,
    );
  });

  test("renders blog title and author", async () => {
    const elem = screen.getByText("Killing Machine John Rambo");
    expect(elem).toBeVisible();
    const likes = screen.queryByTestId("likes");
    const url = screen.queryByTestId("url");
    expect(likes).not.toBeVisible();
    expect(url).not.toBeVisible();
  });

  test("likes and url displayed when button clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: "view" });
    const likes = screen.queryByTestId("likes");
    const url = screen.queryByTestId("url");

    await user.click(button);

    expect(likes).toBeVisible();
    expect(url).toBeVisible();
  });

  test("when like button is cliked twiced, event is recieved twice", async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByRole("button", { name: "view" });

    await user.click(viewButton);

    const button = screen.getByRole("button", { name: "like" });

    await user.click(button);
    await user.click(button);

    expect(addLikes.mock.calls).toHaveLength(2);
  });
});
