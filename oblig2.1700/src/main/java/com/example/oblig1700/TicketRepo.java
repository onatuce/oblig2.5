package com.example.oblig1700;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
@Repository
public class TicketRepo {
    @Autowired
    JdbcTemplate jdbcTemplate;

    class TicketMapper implements RowMapper<Ticket> {
        @Override
        public Ticket mapRow(ResultSet rs, int rowNr) throws SQLException {
            Ticket ticket = new Ticket();
            ticket.setID(rs.getInt("ID"));
            ticket.setFilm(rs.getString("film"));
            ticket.setAntall(rs.getInt("antall"));
            ticket.setFornavn(rs.getString("fornavn"));
            ticket.setEtternavn(rs.getString("etternavn"));
            ticket.setTelefon(rs.getString("telefon"));
            ticket.setEpost(rs.getString("epost"));
            return ticket;
        }
    }


    public int lagreTicket(Ticket innTicket) {
        String sql = "INSERT INTO ticket (ID, film, antall, fornavn, etternavn, telefon, epost) VALUES (?, ?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql, innTicket.getID(), innTicket.getFilm(), innTicket.getAntall(),
                innTicket.getFornavn(), innTicket.getEtternavn(), innTicket.getTelefon(),
                innTicket.getEpost());
    }
    public List<Ticket> hentTicket() {
        String sql = "SELECT * FROM ticket";
        List<Ticket>alleKunder=jdbcTemplate.query(sql, new BeanPropertyRowMapper(Ticket.class));
        return alleKunder;
    }
    public void deleteAll() {
        String sql = "DELETE FROM ticket;";
        jdbcTemplate.update(sql);
    }
    public void deleteTicket(int ID){
        String sql = "DELETE FROM ticket WHERE id=?;";
        jdbcTemplate.update(sql,ID);
    }
}






















    /*
    public static void updateTicket (int ID,String column,String value){
        String sql="UPDATE ticket SET\" + column + \" = ? WHERE ID = ?";
        JdbcTemplate.update(sql,value,ID);
    }

     */




/*package com.example.oblig1700;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TicketRepo {
    @Autowired
    private JdbcTemplate db;
    public void lagreTicket(Ticket innTicket) {
        String sql = "INSERT INTO Ticket(ID, fornavn) VALUES (?, ?)";
        db.update(sql, innTicket.getID(), innTicket.getFornavn());
    }

    public List<Ticket>hentTicket(){
        String sql="SELECT*FROM Ticket";
        List<Ticket> alleTicket=db.query(sql,new BeanPropertyRowMapper(Ticket.class));
        return alleTicket;
    }
    public void slettTicket(){
        String sql="DELETE FROM Ticket";
        db.update(sql);
    }
}

 */
