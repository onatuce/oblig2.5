$(function(){
    fetchAllTickets();
});

let tickets = [];

function fetchAllTickets() {
    $.get("/hentTicket", function(data) {
        tickets = data;
        renderTickets(tickets);
    });
}
function renderTickets(tickets) {
    let ticketTable = "<table>";
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

    ticketTable += "</table>";
    $(".billetter").html(ticketTable);
}
function deleteAlle() {
    $.ajax({
        url: '/deleteAll',
        type: 'GET',
        success: function (data) {
            console.log("Success:", data);
            fetchAllTickets();
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
            alert("wrong!!!");
        }
    });
}
function deleteTicket(ticketID) {
    $.ajax({
        url: '/deleteAll',
        type: 'DELETE',
        contentType: "application/json",
        data: JSON.stringify(ticketID),
        success: function (data) {
            console.log("Success:", data);
            fetchAllTickets();
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
            alert("wrong!");
        }
    });
}
$("#bestillingsskjema").submit(function(event) {
    event.preventDefault();
    const formData = {
        film: $("#film").val(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefon: $("#telefon").val(),
        epost: $("#epost").val(),
    };
    $.ajax({
        type: "POST",
        url: "/lagreTicket",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (data) {
            console.log("Success:", data);
            fetchAllTickets();
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
            alert(" wrong!");
        }
    });
});
