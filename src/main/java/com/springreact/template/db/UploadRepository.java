package com.springreact.template.db;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.Date;

public interface UploadRepository extends PagingAndSortingRepository<Upload, Long> {

    // query for checking if the upload belongs to the user
    @RestResource(exported = false)
    @Query(value = "SELECT u.user.id FROM Upload u WHERE u.user = :user AND u.id = :id")
    Long getUploadByUserAndUploadId (
            @Param("user") User user,
            @Param("id") Long id
    );

    // query for checking if only "name" was altered (only allowed PATCH)
    @RestResource(exported = false)
    @Query(value = "SELECT u.user.id FROM Upload u WHERE u.id = :id AND u.fileName = :fileName AND u.createdOn = :createdOn")
    Long getUploadByIdAndFileNameAndCreatedOn(
            @Param("id") Long id,
            @Param("fileName") String fileName,
            @Param("createdOn") Date createdOn
    );

    // query fro getting the Upload based on fileName
    @RestResource(exported = false)
    @Query(value = "SELECT u FROM Upload u WHERE u.fileName = :fileName")
    Upload findUploadByFileName(
            @Param("fileName") String fileName
    );

    // save
    // Only allow to PATCH if Owner (POST, PUT generally blocked)
    // this check is already done inside securityConfig itself
    // An Additional Validator is Added to check if it only contains
    // the 'name' field and nothing else, that's going to be altered

    @Override
    @RestResource(exported = false)
    <S extends Upload> Iterable<S> saveAll(Iterable<S> var1);

    //Optional<T> findById(ID var1); // GET /api/uploads/1

    @Override
    @RestResource(exported = false)
    boolean existsById(Long var1);

    //Iterable<T> findAll(); // GET /api/uploads
    //Iterable<T> findAll(Sort var1);
    //Page<T> findAll(Pageable var1);
    //Iterable<T> findAllById(Iterable<ID> var1);

    //long count();

    @Override
    @RestResource(exported = false)
    void deleteById(Long var1);

    @Override
    @RestResource(exported = false)
    void delete(Upload var1);

    @Override
    @RestResource(exported = false)
    void deleteAll(Iterable<? extends Upload> var1);

    @Override
    @RestResource(exported = false)
    void deleteAll();
}
