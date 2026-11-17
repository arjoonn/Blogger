package org.sample.userblog.service.impl;

import org.sample.userblog.entity.User;
import org.sample.userblog.mapper.UserUserDetailsMapper;
import org.sample.userblog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserUserDetailServiceImp implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUname(username);
        return user.map(UserUserDetailsMapper::new)
                .orElseThrow(()->new UsernameNotFoundException("user not found"));
    }
}
