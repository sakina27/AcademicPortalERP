package com.sakina.academicerp.repo;

import com.sakina.academicerp.entity.Departments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentsRepo extends JpaRepository<Departments, Long> {
    Departments findByName(String name);
}
