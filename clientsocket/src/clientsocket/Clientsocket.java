 

package clientsocket;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;
import java.net.*;  
import java.io.*;   
import java.nio.CharBuffer;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
public class Clientsocket {
    public static void main(String[] args) {

     String Previous=null;
     String part1,part2,part3,part4,part5,part6,part7,part8,part9;
    
   try{     
       Socket client=new Socket("10.1.215.13",80);
       Socket client2=new Socket("10.1.215.10",80);

       BufferedReader kbreader;
       BufferedWriter writer;
       BufferedReader reader;
       BufferedReader reader1;
       BufferedReader kbreader1;
       BufferedWriter writer1;

       kbreader = new BufferedReader(new InputStreamReader(System.in));
       writer = new BufferedWriter(new OutputStreamWriter(client.getOutputStream()));
       reader = new BufferedReader(new InputStreamReader(client.getInputStream()));
       kbreader1 = new BufferedReader(new InputStreamReader(System.in));
       writer1 = new BufferedWriter(new OutputStreamWriter(client2.getOutputStream()));
       reader1 = new BufferedReader(new InputStreamReader(client2.getInputStream()));

       String data = "", Current=null,Current2=null;
       String previous=null;
       System.out.print("Received from the Server: ");
      Current = reader.readLine();
      Current2=reader1.readLine();
       System.out.println(Current);
       System.out.println(Current2);
       while(true)
       { 
           Current = reader.readLine();
           Current2=reader1.readLine();
           System.out.println(Current+","+Current2);
           //System.out.println(Current2);
           
          
           String abc = Current;
String[] parts = abc.split(",");
 part1 = parts[0]; 
 part2 = parts[1];
 part3 = parts[2];
 part4 = parts[3];
 part5 = parts[4];
 part6 = parts[5];
 part7 = parts[6];
 part8 = parts[7];
 part9 = parts[8];
         if(part1.equals("ON"))
         {
             part1.equals("1");
            }
            else if(part1.equals("OFF"))
            {
               part1.equals("0");
            }
        
           String userName="sa";
            String password = "sql";
              String url = "jdbc:sqlserver://DESKTOP-SHMUVCE;databaseName=Power";
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            Connection conn = DriverManager.getConnection(url, userName, password);
            Statement statement = conn.createStatement();
             String queryString = "insert into SOURCE(PHASE1,PHASE2,PHASE3,UPS,FLOOR,TEMPERATURE,HUMIDITY,DATE,TIME,SOURCE) VALUES('"+part1+"','"+part2+"','"+part3+"','"+part4+"','"+part5+"','"+part6+"','"+part7+"','"+part8+"','"+part9+"','"+Current2+"')";
             int numRows = statement.executeUpdate(queryString);
             
           
       }
       
}catch(Exception e){
          System.err.println("Exception: " + e.toString());
      }
   }
}

