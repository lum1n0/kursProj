package Proj.laba.security;

import Proj.laba.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserDetailsImpl implements UserDetails {
    private final Long id;
    private final String username;
    private final String password;
    private final String role;
    private final Long roleId;
    
    public UserDetailsImpl(User user) {
        this.id = user.getId();
        this.username = user.getLogin();
        this.password = user.getPassword();
        this.role = user.getRole().getTitle();
        this.roleId = user.getRole().getId();
    }
    
    public Long getId() {
        return id;
    }
    
    public String getRole() {
        return role;
    }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role));
    }
    
    @Override
    public String getPassword() {
        return password;
    }
    
    @Override
    public String getUsername() {
        return username;
    }
    
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    
    @Override
    public boolean isEnabled() {
        return true;
    }
    
    public Long getRoleId() {  // Добавь метод getRoleId()
        return roleId;
    }
}
