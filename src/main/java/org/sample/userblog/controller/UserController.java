package org.sample.userblog.controller;

import org.sample.userblog.dto.Userdto;
import org.sample.userblog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody Userdto userdto){
        try {
            Userdto userdto1 = userService.creaUser(userdto);
            return new ResponseEntity<>("user created", HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("failed to create user",HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<String> getUser(@RequestBody Userdto userdto){
        return new ResponseEntity<>(userService.verifyUser(userdto),HttpStatus.OK);
    }
}
