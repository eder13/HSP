package com.springreact.template.db;

import com.sun.istack.NotNull;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

/* Local Database */
@Entity
@Table(name = "user")
public class User {

    /* Model of the MySQL Table 'users'*/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long id;

    private String email;

    private int uploadCount;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date joined;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Set<Upload> uploads;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "user_upload", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "upload_id", referencedColumnName = "id"))
    @RestResource(path = "downloads", rel = "downloads")
    private Set<Upload> downloads;

    public User(String email, int uploadCount, Date joined, Set<Upload> uploads, Set<Upload> downloads) {
        this.email = email;
        this.uploadCount = uploadCount;
        this.joined = joined;
        this.uploads = uploads;
        this.downloads = downloads;
    }

    public User() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getUploadCount() {
        return uploadCount;
    }

    public void setUploadCount(int uploadCount) {
        this.uploadCount = uploadCount;
    }

    public Date getJoined() {
        return joined;
    }

    public void setJoined(Date joined) {
        this.joined = joined;
    }

    public Set<Upload> getUploads() {
        return uploads;
    }

    public void setUploads(Set<Upload> uploads) {
        this.uploads = uploads;
    }

    public Set<Upload> getDownloads() {
        return downloads;
    }

    public void setDownloads(Set<Upload> downloads) {
        this.downloads = downloads;
    }
}
