import { CreateBlog } from "./CreateBlog";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";

test("blog form calls event handler with correct details", async () => {
  const addBlog = vi.fn();
  const user = userEvent.setup();

  render(<CreateBlog addBlog={addBlog} user={user} />);

  const input = screen.getAllByRole("textbox");
  const submitBtn = screen.getByRole("button", { name: "create" });
  console.log(submitBtn);

  await user.type(input[0], "Love in the Island");
  await user.type(input[1], "Gabriel Susa");
  await user.type(input[2], "https://www.falsb.com");

  await user.click(submitBtn);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe("Love in the Island");
});
