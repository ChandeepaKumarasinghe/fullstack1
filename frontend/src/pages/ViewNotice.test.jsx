import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ViewNotices from "./ViewNotices";

// Mock axios
jest.mock("axios");

// Mock useAuth
jest.mock("../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("ViewNotices Component", () => {
  const mockNotices = [
    {
      _id: "1",
      title: "Notice 1",
      description: "This is the first notice.",
      createdAt: "2023-12-01T15:30:00.000Z",
    },
    {
      _id: "2",
      title: "Notice 2",
      description: "This is the second notice.",
      createdAt: "2023-12-02T17:30:00.000Z",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockResolvedValue({ data: mockNotices });
    useAuth.mockReturnValue({ user: { userType: "adminUser" } });
  });

  test("renders notices and displays them correctly", async () => {
    render(
      <BrowserRouter>
        <ViewNotices />
      </BrowserRouter>
    );

    // Check for title
    expect(screen.getByText("All Notices")).toBeInTheDocument();

    // Wait for notices to be displayed
    await waitFor(() => {
      expect(screen.getByText("Notice 1")).toBeInTheDocument();
      expect(screen.getByText("Notice 2")).toBeInTheDocument();
    });

    // Check for notice details
    expect(screen.getByText("This is the first notice.")).toBeInTheDocument();
    expect(screen.getByText("This is the second notice.")).toBeInTheDocument();

    // Check for presence of dates without exact format matching
    const dateDivs = screen.getAllByTestId("notice-date");
    expect(dateDivs).toHaveLength(2);
    expect(dateDivs[0]).toHaveTextContent(/12\/1\/2023/);
    expect(dateDivs[1]).toHaveTextContent(/12\/2\/2023/);
  });

  test("renders no notices message when there are no notices", async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(
      <BrowserRouter>
        <ViewNotices />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("No notices found")).toBeInTheDocument();
    });
  });

  test("renders 'Add Notice' button for admin users", async () => {
    render(
      <BrowserRouter>
        <ViewNotices />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Add Notice")).toBeInTheDocument();
    });
  });

  test("does not render 'Add Notice' button for non-admin users", async () => {
    useAuth.mockReturnValue({ user: { userType: "regularUser" } });

    render(
      <BrowserRouter>
        <ViewNotices />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Add Notice")).not.toBeInTheDocument();
    });
  });

  test("renders a 'Go Home' button", async () => {
    render(
      <BrowserRouter>
        <ViewNotices />
      </BrowserRouter>
    );

    await waitFor(() => {
      const linkElement = screen.getByRole("link", { name: /go home/i });
      expect(linkElement).toHaveAttribute("href", "/");
    });
  });

  test("handles API error gracefully", async () => {
    axios.get.mockRejectedValue(new Error("Failed to fetch notices"));

    render(
      <BrowserRouter>
        <ViewNotices />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch notices")).toBeInTheDocument();
    });
  });
});
