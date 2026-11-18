package org.sample.userblog.mapper;

import org.sample.userblog.dto.Userdto;
import org.sample.userblog.entity.User;

//Request DTO → Entity (toEntity) The request DTO contains the fields that the frontend sends to your backend.
//Entity → Response DTO (toDto) The response DTO contains only the information you want to send back to the frontend.

public class UserMapper {
    public static Userdto toDto(User user){
        return new Userdto(user.getUname(), user.getPass());
    }

    public static User toEntity(Userdto userdto){
        User user = new User();

        user.setUname(userdto.uname());
        user.setPass(userdto.pass());

        return user;
    }
}
