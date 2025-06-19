import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import CardContent from "@mui/material/CardContent";

export const Route = createFileRoute("/")({
  component: RootComponent,
});

function RootComponent() {
  const [count, setCount] = useState(0);

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card>
        <CardContent>
          <Stack direction="column" alignItems="center" spacing={4}>
            <div>
              <a href="https://vite.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div>
            <Typography variant="h3">Vite + React</Typography>
            <Button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
