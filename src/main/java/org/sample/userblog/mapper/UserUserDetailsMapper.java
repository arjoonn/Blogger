package org.sample.userblog.mapper;

import org.sample.userblog.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class UserUserDetailsMapper implements UserDetails {

    private final String uname;
    private final String pass;
    private final List<GrantedAuthority> grantedAuthorities;

    public UserUserDetailsMapper(User user) {
        uname = user.getUname();
        pass = user.getPass();
        grantedAuthorities = List.of(new SimpleGrantedAuthority(
                "ROLE_" + user.getRole()));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return grantedAuthorities;
    }

    @Override
    public String getPassword() {
        return pass;
    }

    @Override
    public String getUsername() {
        return uname;
    }
}
