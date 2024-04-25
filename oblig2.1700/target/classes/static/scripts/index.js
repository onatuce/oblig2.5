

$(function(){

    fetchAllTickets();
});

let tickets = []; // Stores all tickets fetched from the server

function fetchAllTickets() {
    $.get("/hentTicket", function(data) {
        tickets = data;
        renderTickets(tickets); // Render tickets on the screen
    });
}

function renderTickets(tickets) {
    let ticketTable = "<table>"; // Start table
    ticketTable += "<tr>" +
        "<th>Film</th>" +
        "<th>Antall</th>" +
        "<th>Fornavn</th>" +
        "<th>Etternavn</th>" +
        "<th>Telefonnummer</th>" +
        "<th>E-Post</th>" +
        "<th>ID</th>" +
        "<th>Action</th>" +
        "</tr>";

    tickets.forEach((ticket) => {
        ticketTable += "<tr>";
        Object.values(ticket).forEach((value) => {
            ticketTable += "<td>" + value + "</td>";
        });
        ticketTable += "<td><button class='btn btn-danger' onclick='deleteTicket(" + ticket.ID + ")'>Slett</button></td>";
        ticketTable += "</tr>";
    });

    ticketTable += "</table>"; // End table
    $(".billetter").html(ticketTable); // Update ticket view
}

function deleteAllTickets() {
    $.ajax({
        url: '/deleteAll',
        type: 'GET',
        success: function () {
            fetchAllTickets(); // Update view after successful deletion
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    });
}

function deleteTicket(ticketID) {
    $.ajax({
        url: '/deleteEntry',
        type: 'DELETE',
        contentType: "application/json",
        data: JSON.stringify(ticketID),
        success: function () {
            fetchAllTickets(); // Update view after successful deletion
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    });
}

$("#bestillingsskjema").submit(function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = {
        movieName: $("#film").val(),
        amount: $("#antall").val(),
        firstName: $("#fornavn").val(),
        lastName: $("#etternavn").val(),
        phoneNumber: $("#telefon").val(),
        eMail: $("#epost").val(),
    };
    $.ajax({
        type: "POST",
        url: "/lagreTicket",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
            console.log("Success:", response);
            fetchAllTickets(); // Update view after successful addition
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    });
});





