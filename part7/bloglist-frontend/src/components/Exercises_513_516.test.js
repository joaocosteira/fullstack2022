import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

const blog = {
  title: "Blog title",
  author: "costeira",
  url: "https://fullstackopen.com/en/part5/testing_react_apps",
  likes: 10,
  user: {
    name: "costeira",
    username: "costeira",
  },
};

const fakeUser = {
  name: "costeira",
  username: "costeira",
};

test("(5.13) renders title and author but url and likes are not displayed.", () => {
  render(<Blog blog={blog} />);

  const title = screen.queryByText("Blog title");
  const author = screen.queryByText("costeira");
  const author_title_sentence = screen.queryByText("Blog title by costeira");
  const url = screen.queryByText(
    "https://fullstackopen.com/en/part5/testing_react_apps"
  );
  const likes = screen.queryByText("Likes 10");
  //screen.debug()
  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(author_title_sentence).toBeDefined();
  expect(url).toBeNull();
  expect(likes).toBeNull();
  /*   const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Blog title'
  ) */
});

test("(5.14) By clicking in the view Blog, the url and likes are displayed.", async () => {
  render(<Blog blog={blog} />);

  //clicking the view button
  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  //get different elements of the blog
  const title = screen.queryByText("Blog title");
  const author = screen.queryByText("costeira");
  const author_title_sentence = screen.queryByText("Blog title by costeira");
  const url = screen.queryByText(
    "https://fullstackopen.com/en/part5/testing_react_apps"
  );
  const likes = screen.queryByText("Likes 10");

  //ensure that all of them are displayed
  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(author_title_sentence).toBeDefined();
  expect(url).toBeDefined();
  expect(likes).toBeDefined();
});

test("(5.15) Clicking twice the like button", async () => {
  const mockHandler = jest.fn();

  render(<Blog blog={blog} user={fakeUser} vote={mockHandler} />);

  //clicking the view button
  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  //user gives a couple of likes
  const like = screen.getByText("like");
  await user.click(like);
  await user.click(like);

  //We are expecting to have called the vote function a coule of times
  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("(5.16) <BlogForm /> Adds Blog", async () => {
  const handleNewBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm handleNewBlog={handleNewBlog} />);

  const inputs = screen.getAllByRole("textbox");
  //const input = screen.getByRole('textbox')
  const sendButton = screen.getByText("create");

  //Another option, since we're working based on the input order
  //is to simply add a placeholder to each input and then filter
  //each one of them by its placeholder text:
  //ex: const input = screen.getByPlaceholderText('write here note content')

  //Another possibility is to simply select elements by id:
  // Example:
  // <input ... id='note-input'/>
  // const input = container.querySelector('#note-input')
  await user.type(inputs[0], "Add a pretty title");
  await user.type(inputs[1], "costeira");
  await user.type(inputs[2], "https://www.google.com");
  await user.click(sendButton);

  expect(handleNewBlog.mock.calls).toHaveLength(1);

  //console.log(handleNewBlog.mock.calls[0][0])
  expect(handleNewBlog.mock.calls[0][0].title).toBe("Add a pretty title");
  expect(handleNewBlog.mock.calls[0][0].author).toBe("costeira");
  expect(handleNewBlog.mock.calls[0][0].url).toBe("https://www.google.com");
});
