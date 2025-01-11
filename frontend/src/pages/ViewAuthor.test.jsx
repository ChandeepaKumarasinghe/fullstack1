import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import ViewAuthor from "./viewAuthor";

// Mock axios
jest.mock("axios");

describe("ViewAuthor Component", () => {
  const mockAuthors = [
    {
      _id: "1",
      name: "John Doe",
      age: 45,
      medium: "Books",
      country: "USA",
    },
    {
      _id: "2",
      name: "Jane Smith",
      age: 34,
      medium: "Magazines",
      country: "UK",
    },
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    // Default successful response
    axios.get.mockResolvedValue({ data: mockAuthors });
  });

  test("renders loading state and then authors list", async () => {
    render(
      <BrowserRouter>
        <ViewAuthor />
      </BrowserRouter>
    );

    // Check if the title is rendered
    expect(screen.getByText("Authors List")).toBeInTheDocument();

    // Wait for authors to be rendered
    await waitFor(() => {
      expect(screen.getByTestId("author-list")).toBeInTheDocument();
    });

    // Check if both authors are rendered
    expect(screen.getByText(/John Doe \(45, Books, USA\)/)).toBeInTheDocument();
    expect(
      screen.getByText(/Jane Smith \(34, Magazines, UK\)/)
    ).toBeInTheDocument();
  });

  test("handles author deletion successfully", async () => {
    axios.delete.mockResolvedValueOnce({});

    render(
      <BrowserRouter>
        <ViewAuthor />
      </BrowserRouter>
    );

    // Wait for the authors to be rendered
    await waitFor(() => {
      expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    });

    // Click delete button for first author
    const deleteButton = screen.getByLabelText("Delete John Doe");
    fireEvent.click(deleteButton);

    // Verify delete request was made
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        "http://localhost:5555/authors/delete/1"
      );
    });

    // Verify author is removed from the list
    await waitFor(() => {
      expect(screen.queryByText(/John Doe/)).not.toBeInTheDocument();
      expect(screen.getByText(/Jane Smith/)).toBeInTheDocument();
    });
  });

  test("handles fetch error correctly", async () => {
    // Mock the API call to fail
    const errorMessage = "Network error";
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    render(
      <BrowserRouter>
        <ViewAuthor />
      </BrowserRouter>
    );

    // Wait for error message to be displayed
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Failed to load authors"
      );
    });
  });

  test("handles delete error correctly", async () => {
    // First render the component with authors
    axios.get.mockResolvedValueOnce({ data: mockAuthors });
    // Mock the delete call to fail
    axios.delete.mockRejectedValueOnce(new Error("Delete failed"));

    render(
      <BrowserRouter>
        <ViewAuthor />
      </BrowserRouter>
    );

    // Wait for authors to load
    await waitFor(() => {
      expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    });

    // Try to delete an author
    const deleteButton = screen.getByLabelText("Delete John Doe");
    fireEvent.click(deleteButton);

    // Check for error message
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Failed to delete author"
      );
    });
  });

  test("renders home link with correct attributes", () => {
    render(
      <BrowserRouter>
        <ViewAuthor />
      </BrowserRouter>
    );

    const homeLink = screen.getByText("Go Home");
    expect(homeLink).toHaveAttribute("href", "/");
    expect(homeLink).toHaveClass("home-link");
  });
});
