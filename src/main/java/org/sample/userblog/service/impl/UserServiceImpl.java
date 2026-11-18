package org.sample.userblog.service.impl;

import org.sample.userblog.dto.Userdto;
import org.sample.userblog.entity.User;
import org.sample.userblog.mapper.UserMapper;
import org.sample.userblog.repository.UserRepository;
import org.sample.userblog.service.UserService;
import org.sample.userblog.utilityService.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    public PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtService jwtService;

    @Override
    public Userdto creaUser(Userdto userdto) {
        User user = UserMapper.toEntity(userdto);
        user.setPass(passwordEncoder.encode(user.getPass()));
        user.setRole("USER");
        userRepository.save(user);
        return UserMapper.toDto(user);
    }

    @Override
    public String    verifyUser(Userdto userdto) {
        Authentication authentication= authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userdto.uname(),
                        userdto.pass())
        );
        if(authentication.isAuthenticated()){
                return jwtService.generateUserToken(userdto.uname());
        }
        return "Failure";
    }
}
