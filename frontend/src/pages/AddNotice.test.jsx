// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom"; // To test navigation
// import axios from "axios";
// import AddNotice from "./AddNotice";

// // Mock axios
// jest.mock("axios");

// describe("AddNotice Component", () => {
//   it("renders the form correctly", () => {
//     render(
//       <BrowserRouter>
//         <AddNotice />
//       </BrowserRouter>
//     );

//     // Check if form elements are present
//     expect(screen.getByText("Add Notice")).toBeInTheDocument();
//     expect(screen.getByLabelText("Title")).toBeInTheDocument();
//     expect(screen.getByLabelText("Description")).toBeInTheDocument();
//     expect(screen.getByText("Add Notice")).toBeInTheDocument();
//   });

//   it("allows users to input title and description", () => {
//     render(
//       <BrowserRouter>
//         <AddNotice />
//       </BrowserRouter>
//     );

//     // Simulate user input
//     const titleInput = screen.getByLabelText("Title");
//     const descriptionInput = screen.getByLabelText("Description");

//     fireEvent.change(titleInput, { target: { value: "Test Notice" } });
//     fireEvent.change(descriptionInput, {
//       target: { value: "This is a test notice." },
//     });

//     expect(titleInput.value).toBe("Test Notice");
//     expect(descriptionInput.value).toBe("This is a test notice.");
//   });

//   it("submits the form successfully", async () => {
//     axios.post.mockResolvedValueOnce({ data: { success: true } });

//     render(
//       <BrowserRouter>
//         <AddNotice />
//       </BrowserRouter>
//     );

//     const titleInput = screen.getByLabelText("Title");
//     const descriptionInput = screen.getByLabelText("Description");
//     const submitButton = screen.getByText("Add Notice");

//     fireEvent.change(titleInput, { target: { value: "Test Notice" } });
//     fireEvent.change(descriptionInput, {
//       target: { value: "This is a test notice." },
//     });
//     fireEvent.click(submitButton);

//     expect(axios.post).toHaveBeenCalledWith("http://localhost:5555/notices", {
//       title: "Test Notice",
//       description: "This is a test notice.",
//     });
//   });

//   it("navigates to home page", () => {
//     render(
//       <BrowserRouter>
//         <AddNotice />
//       </BrowserRouter>
//     );

//     const goHomeButton = screen.getByText("Go Home");
//     expect(goHomeButton).toBeInTheDocument();
//   });
// });

// AddNotice.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import AddNotice from "./AddNotice";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("AddNotice Component", () => {
  it("renders the form correctly", () => {
    render(
      <BrowserRouter>
        <AddNotice />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("heading", { name: /create notice/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /submit notice/i })
    ).toBeInTheDocument();
  });

  it("allows users to input title and description", () => {
    render(
      <BrowserRouter>
        <AddNotice />
      </BrowserRouter>
    );

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);

    fireEvent.change(titleInput, { target: { value: "Test Notice" } });
    fireEvent.change(descriptionInput, {
      target: { value: "This is a test notice." },
    });

    expect(titleInput.value).toBe("Test Notice");
    expect(descriptionInput.value).toBe("This is a test notice.");
  });

  it("submits the form successfully", async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    render(
      <BrowserRouter>
        <AddNotice />
      </BrowserRouter>
    );

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole("button", { name: /submit notice/i });

    fireEvent.change(titleInput, { target: { value: "Test Notice" } });
    fireEvent.change(descriptionInput, {
      target: { value: "This is a test notice." },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("http://localhost:5555/notices", {
        title: "Test Notice",
        description: "This is a test notice.",
      });
    });
  });

  it("navigates to home page", () => {
    render(
      <BrowserRouter>
        <AddNotice />
      </BrowserRouter>
    );

    const goHomeButton = screen.getByRole("button", { name: /go home/i });
    expect(goHomeButton).toBeInTheDocument();
  });
});
