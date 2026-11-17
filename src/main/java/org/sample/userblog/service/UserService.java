package org.sample.userblog.service;

import org.sample.userblog.dto.Userdto;

public interface UserService {
    public Userdto creaUser(Userdto userdto);

    public String verifyUser(Userdto userdto);
}
