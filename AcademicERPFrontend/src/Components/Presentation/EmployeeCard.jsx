import React from "react";
import { Avatar, Typography, Button, Box, Checkbox, Card, CardContent } from "@mui/material";

const EmployeeCard = ({ employee, isSelected, onCheckboxChange, onModifyClick }) => {
    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                background: "linear-gradient(to bottom right, #ebdbfd, #ebdbfd)",
                borderRadius: "15px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                padding: "16px",
                margin: "10px",
                height: "100%",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {/* Checkbox */}
                {employee.department == "Faculty" && (
                <Checkbox
                    checked={isSelected}
                    onChange={(event) => onCheckboxChange(event, employee)}
                    sx={{ alignSelf: "flex-start" }}
                />
                )}
                {/* Avatar */}
                <Avatar
                    alt={employee.first_name}
                    src={employee.photograph_path}
                    sx={{ width: 80, height: 85 }}
                />
            </Box>

            {/* Employee Info */}
            <CardContent sx={{ textAlign: "center", padding: "16px 0" }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        color: "#8e44ad",
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    {employee.fullName()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {employee.title} - {employee.department}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {employee.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ${employee.salary}
                </Typography>
            </CardContent>

            {/* Modify Button */}

            <Button
                variant="contained"
                onClick={() => onModifyClick(employee)}
                sx={{
                    background: "linear-gradient(to right, #8e44ad, #3498db)",
                    color: "#fff",
                    marginTop: "8px",
                    "&:hover": {
                        background: "linear-gradient(to right, #0072ff, #00c6ff)",
                    },
                }}
            >
                Modify
            </Button>

        </Card>
    );
};

export default EmployeeCard;
